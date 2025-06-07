import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

async function fetchFlashcards(setFlashcards) {
  const res = await fetch('/api/flashcards/getlist');
  if (res.ok) {
    const data = await res.json();
    setFlashcards(data);
  } else {
    console.error('Failed to fetch flashcards');
  }
}

async function deleteCardById(id, setFlashcards) {
  const res = await fetch('/api/flashcards/deletecard/id', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Deleted card:', data);
    fetchFlashcards(setFlashcards);
  } else {
    const error = await res.json();
    console.error('Error deleting card:', error);
  }
}

function FlashcardList({flashcards, setFlashcards}) {
  useEffect(() => {
    fetchFlashcards(setFlashcards);
  }, []);
  
  if (!flashcards.length) {
    return <div>No cards yet...</div>;
  }

  return (
    <div>
      <h2>Flashcards</h2>
      <ul>
        {flashcards.map((card, index) => (
          <li key={index}>
            {card.id} - {card.question}:{card.answer}
            <button onClick={() => deleteCardById(card.id, setFlashcards)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/flashcards/addcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });

    if (res.ok) {
      setMessage('Flashcard added!');
      setQuestion('');
      setAnswer('');
      fetchFlashcards(setFlashcards);
    } else {
      const error = await res.json();
      setMessage('Error: ' + error.error);
    }
  };

  return <div>
    <h1>Flashumi</h1>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
    <p>{message}</p>
    <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
  </div>
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}