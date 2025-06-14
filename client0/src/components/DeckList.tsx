import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDeckList, deleteDeckById } from "../ApiCalls";

export function DeckList({decks, setDecks}) {
  useEffect(() => {
    getDeckList(setDecks);
  }, []);
  
  if (!decks.length) {
    return <div>No decks yet...</div>;
  }

  return (
    <div>
      <h2>Decks</h2>
      <ul>
        {decks.map((deck, index) => (
          <li key={index}>
            <Link to={`/deck/${deck.id}`}>
              {deck.id} - {deck.name}
            </Link>
            <button onClick={() => deleteDeckById(deck.id, setDecks)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}