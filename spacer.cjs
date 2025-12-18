#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure one argument is passed
if (process.argv.length !== 3) {
  console.error('Usage: node replace-nbsp.js <directory>');
  process.exit(1);
}

const dir = process.argv[2];

// Validate directory
if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
  console.error(`Error: "${dir}" is not a directory.`);
  process.exit(1);
}

// Literal non-breaking space (UTF-8)
const NBSP = '\u00A0';

try {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    // Process only regular files
    if (!fs.lstatSync(filePath).isFile()) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all NBSP characters
    const updated = content.split(NBSP).join(' ');

    // Write back only if changes occurred
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
