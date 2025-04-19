import React, { useState } from "react";

function App() {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);

  const submitGuess = async () => {
    const response = await fetch("http://localhost:5050/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess })
    });

    const data = await response.json();
    setFeedback(data.result);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Wordle Guess Test</h1>
      <input
        type="text"
        value={guess}
        maxLength={5}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={submitGuess}>Submit</button>

      <h3>Feedback:</h3>
      <div>{feedback.join(", ")}</div>
    </div>
  );
}

export default App;
