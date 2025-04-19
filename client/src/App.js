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
    const response = await fetch("http://localhost:5050/word");
    const data = await response.json();
    setSolution(data.word.toLowerCase());
  };

  const submitGuess = useCallback(async () => {
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
      <h1>Wordle Guess Test</h1>

      {/* <input
        type="text"
        value={guess}
        maxLength={5}
        onChange={(e) => setGuess(e.target.value)}
        style={{ fontSize: "18px", textTransform: "uppercase" }}
      />
      <button onClick={submitGuess} style={{ marginLeft: "1rem" }}>
        Submit
      </button> */}

    <div className="board">
      {[...Array(6)].map((_, rowIndex) => {
        const entry = guesses[rowIndex] || { word: "", feedback: [] };
        const letters = entry.word.padEnd(5).split("");

        return (
          <div className="row" key={rowIndex}>
            {letters.map((char, colIndex) => (
              <div
                className={`tile ${entry.feedback[colIndex] || ""}`}
                key={colIndex}
              >
                {char.toUpperCase()}
              </div>
            ))}
          </div>
        );
      })} 
    </div>
    
    <div className="keyboard">
    {["QWERTYUIOP", "ASDFGHJKL", "ENTERZXCVBNM⌫"].map((row, rowIndex) => (
      <div className="keyboard-row" key={rowIndex}>
        {row.split("").map((key) => (
          <button
            key={key}
            className="key"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
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
