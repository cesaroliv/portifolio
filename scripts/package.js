"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const data = require("../content.js");

const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

if (!dist.startsWith(root + path.sep)) {
  throw new Error("Diretório de saída fora do projeto.");
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function routeFile(route) {
  return route === "/" ? path.join(root, "index.html") : path.join(root, route.replace(/^\//, ""), "index.html");
}

function copy(relativePath) {
  const normalized = relativePath.replaceAll("/", path.sep).replace(/^[/\\]+/, "");
  const source = path.resolve(root, normalized);
  const destination = path.resolve(dist, normalized);
  if (!source.startsWith(root + path.sep) || !destination.startsWith(dist + path.sep)) {
    throw new Error(`Caminho inválido no pacote: ${relativePath}`);
  }
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error(`Arquivo público ausente: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

const routes = Object.values(data.routes);
const assetPaths = new Set();
for (const route of routes) {
  const source = routeFile(route);
  const relative = path.relative(root, source);
  copy(relative);
  const html = fs.readFileSync(source, "utf8");
  for (const match of html.matchAll(/\/assets\/[^"'<>\s,]+/g)) {
    assetPaths.add(match[0].replace(/^\//, ""));
  }
}

for (const file of ["content.js", "script.js", "styles.min.css", "sitemap.xml", "robots.txt", "CNAME"]) copy(file);
for (const asset of [...assetPaths].sort()) copy(asset);

const manifest = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else {
      const buffer = fs.readFileSync(absolute);
      manifest.push({
        path: path.relative(dist, absolute).replaceAll(path.sep, "/"),
        bytes: buffer.length,
        sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
      });
    }
  }
}
walk(dist);
manifest.sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(path.join(dist, "build-manifest.json"), JSON.stringify({ generatedAt: "2026-07-15", files: manifest }, null, 2) + "\n", "utf8");

const totalBytes = manifest.reduce((sum, file) => sum + file.bytes, 0);
console.log(`Pacote preparado em dist/: ${manifest.length} arquivos, ${(totalBytes / 1024 / 1024).toFixed(2)} MB.`);
