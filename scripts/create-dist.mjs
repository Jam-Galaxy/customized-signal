import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

function createDistJson() {
  const sourceJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));
  const distJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.dist.json")));
  distJson.version = sourceJson.version;
  fs.writeFileSync(path.resolve(__dirname, "../dist/package.json"), JSON.stringify(distJson, null, 2));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

createDistJson();
fs.copyFileSync(path.resolve(__dirname, "../.npmrc"), path.resolve(__dirname, "../dist/.npmrc"));