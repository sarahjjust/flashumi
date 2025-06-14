import { Link } from 'react-router';
import { useState } from 'react';
import { addDeck, getDeckList } from '../ApiCalls';
import { Deck } from '../../../common/types/Deck';
import { DeckList } from '../functionality/DeckList';

export function NewDeck() {
  const [deckName, setDeckName] = useState('');
  const [message, setMessage] = useState('');
  const [decks, setDecks] = useState([] as Deck[]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const ok = await addDeck(new Deck(deckName));

    if (ok) {
      setMessage('Deck added!');
      setDeckName('');
      getDeckList(setDecks);
    } else {
      setMessage('There was a problem adding the card...');
    }
  };

  return (
    <div>
      <h1>Create a New Deck</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </label>
        <button type="submit">Create Deck</button>
      </form>
      <p>{message}</p>
      <Link to="/">Home</Link>
      <DeckList decks={decks} setDecks={setDecks}/>
    </div>
  );
}