import { Link } from 'react-router-dom';

export function NewDeck() {
  return (
    <div>
      <h1>Create a New Deck</h1>
      <form>
        <label>
          Deck Name:
          <input type="text" name="deckName" />
        </label>
        <button type="submit">Create Deck</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}