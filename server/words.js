const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "wordle-words.txt");

const words = fs
  .readFileSync(filePath, "utf-8")
  .split("\n")
  .map((w) => w.trim().toLowerCase())
  .filter((w) => w.length === 5);

module.exports = words;
