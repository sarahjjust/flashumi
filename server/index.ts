import { Card } from '../common/types/Card';

const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/flashcards/getcard/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/flashcards/getlist', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flashcards');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
 
app.post('/api/flashcards/addcard', async (req, res) => {
  const card: Card = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO flashcards (question, answer, deck_id) VALUES ($1, $2, $3) RETURNING *',
      [card.question, card.answer, card.deck_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/flashcards/updatecard', async (req, res) => {
  const card: Card = req.body;
  if (!card.id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query(
      'UPDATE flashcards SET question = $1, answer = $2, deck_id = $3 WHERE id = $4 RETURNING *',
      [card.question, card.answer, card.deck_id, card.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/flashcards/deletecard/id', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM flashcards WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});