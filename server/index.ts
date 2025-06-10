const express = require('express');
const pool = require('./db');
const flashcards = require('./flashcards');
const decks = require('./decks');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/flashcards', flashcards);
app.use('/api/decks', decks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});