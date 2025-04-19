import React, { useState } from "react";

function App() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // array of { word: string, feedback: string[] }


  const submitGuess = async () => {
    if (guess.length !== 5) return;

    const response = await fetch("http://localhost:5050/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess })
    });

    const data = await response.json();
    setGuesses([...guesses, { word: guess, feedback: data.result }]);
    setGuess(""); // reset input
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
    </div>
  );
}
export default App;
