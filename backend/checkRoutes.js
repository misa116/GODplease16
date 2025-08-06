// checkRoutes.js - run with: node checkRoutes.js

import fs from "fs";
import path from "path";

const routesDir = path.resolve("./routes");

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const routePattern = /router\.route\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let match;
  while ((match = routePattern.exec(content)) !== null) {
    const routeStr = match[1];
    // Check for colon without param name or invalid colon param
    // E.g. '/:' or '/:/' or '/: ' or '/:something ' (with trailing spaces)
    if (/\/:\s*($|\/)/.test(routeStr)) {
      console.log(`Invalid route in ${filePath}: "${routeStr}"`);
    }
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".js")) {
      scanFile(fullPath);
    }
  }
}

scanDir(routesDir);
