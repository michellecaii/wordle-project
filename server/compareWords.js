function compareGuess(guess, solution) {
    const result = Array(5).fill("gray");
    const solutionLetters = solution.split("");
    const used = Array(5).fill(false); // track which solution letters were matched
  
    // First pass: find greens
    for (let i = 0; i < 5; i++) {
      if (guess[i] === solution[i]) {
        result[i] = "green";
        used[i] = true;
      }
    }
  
    // Second pass: find yellows
    for (let i = 0; i < 5; i++) {
      if (result[i] === "gray") {
        for (let j = 0; j < 5; j++) {
          if (!used[j] && guess[i] === solution[j]) {
            result[i] = "yellow";
            used[j] = true;
            break;
          }
        }
      }
    }
  
    return result;
  }
  
  module.exports = compareGuess;
  