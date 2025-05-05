import express from 'express';
import cors from 'cors';
import { analyzeWebsite } from './scripts/generate-tests';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve Playwright reports
app.use('/reports', express.static(path.join(__dirname, 'projects')));

// API endpoint to analyze website
app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Set proper headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Create project directory
    const projectName = new URL(url).hostname.replace(/\./g, '-');
    const projectsDir = path.join(__dirname, 'projects');
    const projectDir = path.join(projectsDir, projectName);
    
    // Ensure projects directory exists
    if (!fs.existsSync(projectsDir)) {
      fs.mkdirSync(projectsDir, { recursive: true });
    }

    const sendStatus = (step: number, message: string) => {
      res.write(`data: ${JSON.stringify({ type: 'status', step, message })}\n\n`);
    };

    // Initialize new Playwright project
    sendStatus(0, 'Initializing project...');
    await execAsync(`npx create-playwright@latest ${projectDir} --quiet`);
    
    // Install Playwright browsers
    sendStatus(1, 'Installing Playwright browsers...');
    await execAsync(`cd ${projectDir} && npx playwright install --with-deps chromium`);
    
    // Analyze website and generate tests
    sendStatus(2, 'Creating project directory...');
    sendStatus(3, 'Analyzing website...');
    await analyzeWebsite(url, projectDir);
    
    // Run the tests with both HTML and JSON reporters
    sendStatus(4, 'Generating tests...');
    sendStatus(5, 'Running tests...');
    
    try {
      // Run tests with both reporters
      const { stdout, stderr } = await execAsync(`cd ${projectDir} && npx playwright test --reporter=html,json`);
      
      // Parse test results from the JSON output
      const jsonOutputPath = path.join(projectDir, 'test-results.json');
      let testResults = { total: 0, passed: 0, failed: 0, skipped: 0, duration: 0, tests: [] };
      
      if (fs.existsSync(jsonOutputPath)) {
        const jsonOutput = fs.readFileSync(jsonOutputPath, 'utf-8');
        testResults = JSON.parse(jsonOutput);
      }
      
      // Get test report HTML
      const reportPath = path.join(projectDir, 'playwright-report', 'index.html');
      let reportHtml = '';
      if (fs.existsSync(reportPath)) {
        reportHtml = fs.readFileSync(reportPath, 'utf-8');
      }
      
      sendStatus(6, 'Processing results...');
      
      // Generate a unique test ID
      const testId = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Send final results
      const responseData = {
        type: 'complete',
        success: true,
        projectDir,
        testId,
        testResults: {
          summary: {
            total: testResults.total,
            passed: testResults.passed,
            failed: testResults.failed,
            skipped: testResults.skipped,
            duration: testResults.duration
          },
          tests: testResults.tests.map((test: any) => ({
            title: test.title,
            status: test.status,
            duration: test.duration,
            error: test.error?.message || null
          })),
          reportHtml
        },
        errors: stderr
      };

      res.write(`data: ${JSON.stringify(responseData)}\n\n`);
    } catch (testError: any) {
      console.error('Test execution error:', testError);
      
      // If test execution fails, still try to get the report
      const reportPath = path.join(projectDir, 'playwright-report', 'index.html');
      let reportHtml = '';
      if (fs.existsSync(reportPath)) {
        reportHtml = fs.readFileSync(reportPath, 'utf-8');
      }

      // Generate a unique test ID
      const testId = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;

      // Send error results but with report link
      const errorData = {
        type: 'complete',
        success: false,
        projectDir,
        testId,
        error: testError.message,
        testResults: {
          summary: {
            total: 0,
            passed: 0,
            failed: 1,
            skipped: 0,
            duration: 0
          },
          tests: [{
            title: 'Test Execution',
            status: 'failed',
            duration: 0,
            error: testError.message
          }],
          reportHtml
        }
      };

      res.write(`data: ${JSON.stringify(errorData)}\n\n`);
    }
    
    res.end();
  } catch (error: any) {
    console.error('General error:', error);
    res.write(`data: ${JSON.stringify({
      type: 'error',
      success: false,
      error: error?.message || 'An unknown error occurred'
    })}\n\n`);
    res.end();
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    type: 'error',
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Test generator running at http://localhost:${port}`);
}); 