# 🟩 Wordle Clone

This is a fullstack clone of the classic Wordle game, built with **React** on the frontend and **Express (Node.js)** on the backend. It replicates the core gameplay mechanics including color-coded feedback, virtual keyboard input, and random word generation.

---

## 📸 Preview

### 🕹️ Start Screen

<p align="center">
  <img src="./assets/screenshot-empty.png" alt="Start Screenshot" width="400"/>
</p>

### 🎯 Gameplay Example
<p align="center">
  <img src="./assets/screenshot-gameplay.png" alt="Gameplay Screenshot" width="400"/>
</p>


---

## 🌐 Live Demo

- **Frontend (Vercel)**: [https://wordle-project-blue.vercel.app/](https://wordle-project-blue.vercel.app/)
- **Backend (Render)**: [https://wordle-project-backend.onrender.com](https://wordle-project-backend.onrender.com)

---

## Features

### 🎮 Game Mechanics
- Guess a 5-letter word within 6 tries
- Color feedback system:
  - 🟩 **Green**: Correct letter in correct position
  - 🟨 **Yellow**: Correct letter in wrong position
  - ⬛ **Gray**: Letter not in the word
- Virtual keyboard input
- End-of-game popup with "Play Again" option

### 🔁 Word Logic
- Fetches a **random valid 5-letter word** from the backend on each game start from this [this GitHub repository](https://github.com/tabatkins/wordle-list/blob/main/words), taken straight from Wordle's game code
- Backend handles validation and feedback logic

### 🧠 UX & Design
- Game board with tile animations
- Color-coded keyboard feedback
- Responsive layout

---

## 🧱 Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React + CSS        |
| Backend     | Express (Node.js)  |
| Hosting     | Vercel (frontend), Render (backend) |
| Deployment  | GitHub-integrated CI/CD |

---

## 🚀 Running Locally

### 1. Clone the project

```bash
git clone https://github.com/your-username/wordle-clone.git
cd wordle-clone
