import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlashcardList, addFlashcard, deleteCardById } from '../ApiCalls';
import { Card } from '../../../common/types/Card';

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

export function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [flashcards, setFlashcards] = useState([] as Card[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await addFlashcard(new Card(question, answer));

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
    <Link to="/newdeck">Create a New Deck</Link>
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
