#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ejs = require('ejs');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentTemplateFileName = 'environment.prod.ts.template';
const targetEnvironmentFileName = 'environment.prod.ts';

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName), {
    encoding: 'utf-8'
  }
);

// Generate output data
const output = ejs.render(environmentTemplate, Object.assign({}, process.env));
// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

process.exit(0);
