import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDeckById, updateDeck } from '../ApiCalls';
import { Deck } from '../../../common/types/Deck';

export function DeckView() {
  const id = parseInt(useParams().id!);
  const [deck, setDeck] = useState(new Deck(''));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDeck = async () => {
      await getDeckById(id, setDeck);
    };
    fetchDeck();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await updateDeck(deck);

    if (ok) {
      await getDeckById(id, setDeck);
      setMessage('Flashcard updated!');
    } else {
      setMessage('There was a problem updating the card...');
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Deck Name"
        value={deck.name}
        onChange={(e) => setDeck({ ...deck, name: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
    <p>{message}</p>
    <Link to="/">Home</Link>
  </div>;
}
