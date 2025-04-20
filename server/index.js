const compareGuess = require("./compareWords");
const express = require("express");
const cors = require("cors");
const words = require("./words");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wordle backend is running.");
});

app.post("/guess", (req, res) => {
  const { guess, solution } = req.body;

  if (
    !guess || !solution ||
    guess.length !== 5 ||
    solution.length !== 5
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = compareGuess(guess.toLowerCase(), solution.toLowerCase());
  console.log(`Guess: ${guess} vs ${solution} → ${result.join(", ")}`);
  res.json({ result });
});

app.get("/word", (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  res.json({ word });
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
