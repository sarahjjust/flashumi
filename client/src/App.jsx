import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlashcardById, getFlashcardList, addFlashcard, updateFlashcard, deleteCardById } from './ApiCalls';

function FlashcardView() {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState({ id: '', question: '', answer: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFlashcard = async () => {
      await getFlashcardById(id, setFlashcard);
    };
    fetchFlashcard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await updateFlashcard(flashcard.id, flashcard.question, flashcard.answer);

    if (ok) {
      await getFlashcardById(id, setFlashcard);
      setMessage('Flashcard updated!');
    } else {
      setMessage('There was a problem updating the card...');
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Question"
        value={flashcard.question}
        onChange={(e) => setFlashcard({ ...flashcard, question: e.target.value })}
      />
      <input
        placeholder="Answer"
        value={flashcard.answer}
        onChange={(e) => setFlashcard({ ...flashcard, answer: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
    <p>{message}</p>
    <Link to="/">Home</Link>
  </div>;
}

function FlashcardList({flashcards, setFlashcards}) {
  useEffect(() => {
    getFlashcardList(setFlashcards);
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
            <Link to={`/flashcard/${card.id}`}>
              {card.id} - {card.question}:{card.answer}
            </Link>
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

    const ok = await addFlashcard(question, answer);

    if (ok) {
      setMessage('Flashcard added!');
      setQuestion('');
      setAnswer('');
      getFlashcardList(setFlashcards);
    } else {
      setMessage('There was a problem adding the card...');
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
        <Route path="/flashcard/:id" element={<FlashcardView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}