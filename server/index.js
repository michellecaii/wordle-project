const compareGuess = require("./compareWords");
const express = require("express");
const cors = require("cors");
const words = require("./words");

const app = express();
app.use(cors());
app.use(express.json());

const WORD = "party"; // hardcoded for now

app.post("/guess", (req, res) => {
  const { guess } = req.body;

  if (!guess || guess.length !== 5) {
    return res.status(400).json({ error: "Invalid guess" });
  }

  const result = compareGuess(guess.toLowerCase(), WORD);
  console.log(`Guess: ${guess} → ${result.join(", ")}`);
  res.json({ result });
});

app.get("/word", (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  res.json({ word });
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
