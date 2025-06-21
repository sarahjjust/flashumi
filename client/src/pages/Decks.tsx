import { Link } from 'react-router';
import { useState } from 'react';
import { getDeckList } from '../ApiCalls';
import { Deck } from '../../../common/types/Deck';
import { DeckList } from '../functionality/DeckList';
import { AddDeckDialog } from '@/functionality/AddDeckDialog';
import { Button } from '@/components/ui/button';

export function Decks() {
  const [decks, setDecks] = useState([] as Deck[]);

  return (
    <div className="mx-8">
      <h1 className="text-2xl my-6">Create a New Deck</h1>
      <AddDeckDialog onAdd={() => getDeckList(setDecks)} />
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
      <DeckList decks={decks} onUpdate={() => getDeckList(setDecks)}/>
    </div>
  );
}