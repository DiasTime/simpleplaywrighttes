# Website Tests

Automated tests for https://dandbweb.vercel.app/

## Running Tests

```bash
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
```

## Test Structure

- `tests/website.spec.ts`: Main test file containing all test cases
- `playwright.config.ts`: Playwright configuration
- `package.json`: Project dependencies and scripts