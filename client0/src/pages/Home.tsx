import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlashcardList, addFlashcard, deleteCardById } from '../ApiCalls';
import { Card } from '../../../common/types/Card';
import { AddFlashcard } from '../components/AddFlashcard';

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
              {card.id} - {card.question}:{card.answer}:{card.deck}
            </Link>
            <button onClick={() => deleteCardById(card.id, setFlashcards)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Home() {
  const [flashcards, setFlashcards] = useState([] as Card[]);

  return <div>
    <h1>Flashumi</h1>
    <Link to="/newdeck">Create a New Deck</Link>
    <AddFlashcard onAdd={ async () => { await getFlashcardList(setFlashcards); } } deck={null} />
    <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
  </div>
}
