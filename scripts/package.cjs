const { execSync } = require('child_process');

// Package the app using the existing pkg command
execSync('npm run build');
