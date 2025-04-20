import React, { useState, useEffect, useCallback} from "react";
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
    const response = await fetch("https://wordle-project-backend.onrender.com/word");
    const data = await response.json();
    setSolution(data.word.toLowerCase());
  };

  const submitGuess = useCallback(async () => {
    
    if (guess.length !== 5 || gameStatus !== "inProgress") return;

    const response = await fetch("https://wordle-project-backend.onrender.com/guess", {
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

  }, [guess, gameStatus, solution, guesses]);

  const handleKeyPress = (key) => {
    if (gameStatus !== "inProgress") return;
  
    if (key === "ENTER" && guess.length === 5) {
      submitGuess();
    } else if (key === "⌫") {
      setGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && guess.length < 5) {
      setGuess((prev) => prev + key.toLowerCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== "inProgress") return;
  
      const key = event.key.toLowerCase();
  
      if (key === "enter" && guess.length === 5) {
        submitGuess();
      } else if (key === "backspace") {
        setGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-z]$/.test(key) && guess.length < 5) {
        setGuess((prev) => prev + key);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guess, gameStatus, submitGuess]);

  const resetGame = () => {
    setGuesses([]);
    setGuess("");
    setGameStatus("inProgress");
    fetchNewWord();
  };
  
  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="title">Wordle Clone</h1>


<div className="board">
  {[...Array(6)].map((_, rowIndex) => {
    let entry;
    if (rowIndex < guesses.length) {
      // a submitted guess
      entry = guesses[rowIndex];
    } else if (rowIndex === guesses.length) {
      // the in‑progress guess
      entry = { word: guess, feedback: [] };
    } else {
      // future empty rows
      entry = { word: "", feedback: [] };
    }

    const letters = entry.word.padEnd(5).split("");

    return (
      <div className="row" key={rowIndex}>
        {letters.map((char, colIndex) => {
          const color = entry.feedback[colIndex];           // safe: entry always 

          return (
            <div
              className="tile"
              data-color={color || ""}
              key={colIndex}
            >
              {char.toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  })}
</div>

    <div className="keyboard">
    {[
    "QWERTYUIOP",
    "ASDFGHJKL",
    ["ENTER", ..."ZXCVBNM", "⌫"]
  ].map((row, rowIndex) => (
      <div className="keyboard-row" key={rowIndex}>
        {(Array.isArray(row) ? row : row.split("")).map((key) => (
          <button
            key={key}
            className={`key ${key === "ENTER" ? "enter" : ""} ${key === "⌫" ? "delete" : ""}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
    ))}
    </div>

    {(gameStatus === "won" || gameStatus === "lost") && (
  <div className="popup-overlay">
    <div className="popup">
      <h2 className={gameStatus === "won" ? "popup-win" : "popup-lose"}>
        {gameStatus === "won"
          ? "You guessed it!"
          : `Sorry, better luck next time. The word was: ${solution.toUpperCase()}`}
      </h2>
      <button onClick={resetGame} className="popup-button">
        Play Again!
      </button>
    </div>
  </div>
)}
    </div>
    
  );
}
export default App;
