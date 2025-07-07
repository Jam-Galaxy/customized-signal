import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const distPackagePath = path.resolve(__dirname, "../package.dist.json");
const distDirectoryPath = path.resolve(__dirname, "../dist/package.json");
fs.copyFileSync(distPackagePath, distDirectoryPath);
fs.copyFileSync(path.resolve(__dirname, "../.npmrc"), path.resolve(__dirname, "../dist/.npmrc"));