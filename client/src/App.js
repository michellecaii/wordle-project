import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // array of { word: string, feedback: string[] }
  const [gameStatus, setGameStatus] = useState("inProgress");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetchNewWord();
  }, []);

  const fetchNewWord = async () => {
    const response = await fetch("http://localhost:5050/word");
    const data = await response.json();
    setSolution(data.word.toLowerCase());
  };

  const submitGuess = async () => {
    if (guess.length !== 5 || gameStatus !== "inProgress") return;

    const response = await fetch("http://localhost:5050/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess, solution })
    });

    const data = await response.json();

    // Defensive check
  if (!data.result || !Array.isArray(data.result)) {
    console.error("Invalid backend response:", data);
    return;
  }

    const newEntry = { word: guess, feedback: data.result };
    const newGuesses = [...guesses, newEntry];

    setGuesses(newGuesses);
    setGuess(""); // reset input

    //Check win condition
    if (data.result.every((color) => color === "green")){
      setGameStatus("won");
    } else if (newGuesses.length >= 6){
      setGameStatus("lost");
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setGuess("");
    setGameStatus("inProgress");
    fetchNewWord();
  };
  

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Wordle Guess Test</h1>

      <input
        type="text"
        value={guess}
        maxLength={5}
        onChange={(e) => setGuess(e.target.value)}
        style={{ fontSize: "18px", textTransform: "uppercase" }}
      />
      <button onClick={submitGuess} style={{ marginLeft: "1rem" }}>
        Submit
      </button>

      <div className="board">
        {guesses.map((entry, rowIndex) => (
          <div className="row" key={rowIndex}>
            {entry.word.split("").map((char, colIndex) => (
              <div
                className={`tile ${entry.feedback[colIndex]}`}
                key={colIndex}
              >
                {char.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameStatus === "won" && (
      <h2 style={{ color: "green", marginTop: "1rem" }}>Good job! You guessed it!</h2>
    )}
    {gameStatus === "lost" && (
      <h2 style={{ color: "red", marginTop: "1rem" }}>
        Sorry, better luck next time. The word was: {solution.toUpperCase()}
      </h2>
    )}
    {(gameStatus === "won" || gameStatus === "lost") && (
    <button
      onClick={resetGame}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
    Play Again!
    </button>
    )}

    </div>
    
  );
}
export default App;
