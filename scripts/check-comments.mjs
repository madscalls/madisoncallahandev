import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { parse } from "@babel/parser";
import postcss from "postcss";

const root = process.cwd();
const targets = ["src", "scripts", "index.html", "vite.config.js"];
const skip = new Set(["node_modules", "dist", ".git"]);
const problems = [];

const walk = (path) => {
  const stats = statSync(path);
  if (stats.isDirectory()) {
    if (skip.has(path.split("/").pop())) return [];
    return readdirSync(path).flatMap((name) => walk(join(path, name)));
  }
  return [path];
};

const report = (file, line, kind) => problems.push(`${relative(root, file)}:${line} ${kind}`);

const checkScript = (file, source) => {
  const ast = parse(source, { sourceType: "module", plugins: ["jsx"], errorRecovery: true });
  ast.comments.forEach((comment) => report(file, comment.loc.start.line, "JS comment"));
};

const checkStyles = (file, source) => {
  postcss.parse(source, { from: file }).walkComments((comment) => report(file, comment.source.start.line, "CSS comment"));
};

const checkHtml = (file, source) => {
  source.split("\n").forEach((text, index) => {
    if (text.includes("<!--")) report(file, index + 1, "HTML comment");
  });
};

targets
  .map((target) => join(root, target))
  .flatMap((path) => {
    try {
      return walk(path);
    } catch {
      return [];
    }
  })
  .forEach((file) => {
    const ext = extname(file);
    const source = readFileSync(file, "utf8");
    if ([".js", ".jsx", ".mjs"].includes(ext)) checkScript(file, source);
    if (ext === ".css") checkStyles(file, source);
    if (ext === ".html") checkHtml(file, source);
  });

if (problems.length) {
  console.error(`Comments found (this project keeps code comment-free):\n${problems.join("\n")}`);
  process.exit(1);
}

console.log("No comments found.");
