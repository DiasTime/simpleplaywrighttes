import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export async function analyzeWebsite(url: string, projectDir: string) {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  
  try {
    // Navigate to the website
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    // Collect all elements
    const elements = await page.evaluate(() => {
      const data: any = {
        title: document.title,
        headings: [],
        links: [],
        buttons: [],
        images: [],
        forms: [],
        inputs: []
      };

      // Get all headings
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        data.headings.push({
          level: heading.tagName.toLowerCase(),
          text: heading.textContent?.trim()
        });
      });

      // Get all links
      document.querySelectorAll('a').forEach(link => {
        data.links.push({
          text: link.textContent?.trim(),
          href: link.getAttribute('href')
        });
      });

      // Get all buttons
      document.querySelectorAll('button, [role="button"]').forEach(button => {
        data.buttons.push({
          text: button.textContent?.trim(),
          type: button.getAttribute('type')
        });
      });

      // Get all images
      document.querySelectorAll('img').forEach(img => {
        data.images.push({
          alt: img.getAttribute('alt'),
          src: img.getAttribute('src')
        });
      });

      // Get all forms
      document.querySelectorAll('form').forEach(form => {
        data.forms.push({
          id: form.id,
          action: form.action
        });
      });

      // Get all inputs
      document.querySelectorAll('input, textarea, select').forEach(input => {
        data.inputs.push({
          type: input.getAttribute('type'),
          name: input.getAttribute('name'),
          id: input.id
        });
      });

      return data;
    });

    // Generate test files
    const testContent = generateTestFile(url, elements);
    const configContent = generateConfigFile();
    const packageContent = generatePackageFile();
    const readmeContent = generateReadmeFile(url);
    
    // Create project structure
    fs.mkdirSync(path.join(projectDir, 'tests'), { recursive: true });
    
    // Save files
    fs.writeFileSync(path.join(projectDir, 'tests', 'website.spec.ts'), testContent);
    fs.writeFileSync(path.join(projectDir, 'playwright.config.ts'), configContent);
    fs.writeFileSync(path.join(projectDir, 'package.json'), packageContent);
    fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);
    
  } catch (error) {
    console.error('Error analyzing website:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

function generateTestFile(url: string, elements: any): string {
  const hostname = new URL(url).hostname;
  const testName = hostname.split('.')[0];

  return `import { test, expect } from '@playwright/test';

test.describe('${testName} Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('${url}');
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('${elements.title}');
  });

  test('should have all headings', async ({ page }) => {
    ${elements.headings.map((h: any) => 
      `await expect(page.getByRole('heading', { name: '${h.text}' })).toBeVisible();`
    ).join('\n    ')}
  });

  test('should have working navigation links', async ({ page }) => {
    ${elements.links.map((link: any) => 
      `await expect(page.getByRole('link', { name: '${link.text}' })).toBeVisible();`
    ).join('\n    ')}
  });

  test('should have all buttons', async ({ page }) => {
    ${elements.buttons.map((button: any) => 
      `await expect(page.getByRole('button', { name: '${button.text}' })).toBeVisible();`
    ).join('\n    ')}
  });

  test('should have all images', async ({ page }) => {
    ${elements.images.map((img: any) => 
      `await expect(page.locator('img[alt="${img.alt}"]')).toBeVisible();`
    ).join('\n    ')}
  });

  test('should have all forms', async ({ page }) => {
    ${elements.forms.map((form: any) => 
      `await expect(page.locator('form#${form.id}')).toBeVisible();`
    ).join('\n    ')}
  });

  test('should have all inputs', async ({ page }) => {
    ${elements.inputs.map((input: any) => 
      `await expect(page.locator('input[name="${input.name}"]')).toBeVisible();`
    ).join('\n    ')}
  });
});`;
}

function generateConfigFile(): string {
  return `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['json'], ['html']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`;
}

function generatePackageFile(): string {
  return `{
  "name": "website-tests",
  "version": "1.0.0",
  "description": "Automated tests for website",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}`;
}

function generateReadmeFile(url: string): string {
  return `# Website Tests

Automated tests for ${url}

## Running Tests

\`\`\`bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in debug mode
npm run test:debug
\`\`\`

## Test Structure

- \`tests/website.spec.ts\`: Main test file containing all test cases
- \`playwright.config.ts\`: Playwright configuration
- \`package.json\`: Project dependencies and scripts`;
}

// Example usage
const websiteUrl = process.argv[2] || 'https://dandbweb.vercel.app/';
const projectDir = process.argv[3] || './';
analyzeWebsite(websiteUrl, projectDir); 