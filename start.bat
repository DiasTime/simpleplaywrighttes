@echo off
echo Cleaning old dependencies...
rmdir /s /q node_modules
del package-lock.json

echo Installing dependencies...
call npm install

echo Installing TypeScript types...
call npm install --save-dev @types/express @types/node ts-node typescript

echo Installing Playwright browsers...
call npx playwright install --with-deps chromium

echo Starting the server...
call npm start

pause 