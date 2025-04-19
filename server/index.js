const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/guess", (req, res) => {
  // Placeholder logic
  res.json({ result: ["gray", "green", "gray", "yellow", "gray"] });
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
