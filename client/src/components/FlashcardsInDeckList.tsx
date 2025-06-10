import { useEffect } from "react";
import { getFlashcardListByDeckId } from "../ApiCalls";
import { Link } from "react-router-dom";

export function FlashcardsInDeckList({flashcards, setFlashcards, deckId}) {
  useEffect(() => {
    getFlashcardListByDeckId(deckId, setFlashcards);
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
          </li>
        ))}
      </ul>
    </div>
  );
}