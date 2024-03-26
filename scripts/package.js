const { execSync } = require('child_process');

// Path to your source directory (modify as needed)
const srcPath = './src';

// Copy the source directory to the build directory
execSync(`cp -r ${srcPath} ./dist`);

// Package the app using the existing pkg command
execSync('npm run package');
