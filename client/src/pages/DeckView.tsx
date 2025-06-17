import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getDeckById, getFlashcardListByDeckId } from '../ApiCalls';
import { Card } from '../../../common/types/Card';
import { Deck } from '../../../common/types/Deck';
import { FlashcardsInDeckList } from '../functionality/FlashcardsInDeckList';
import { AddFlashcardDialog } from '@/functionality/AddFlashcardDialog';
import { EditDeckDialog } from '@/functionality/EditDeckDialog';
import { Button } from '@/components/ui/button';

export function DeckView() {
  const id = parseInt(useParams().id!);
  const [deck, setDeck] = useState(new Deck(''));
  const [flashcards, setFlashcards] = useState([] as Card[]);

  useEffect(() => {
    const fetchDeck = async () => {
      await getDeckById(id, setDeck);
    };
    fetchDeck();
  }, []);

  return <div className="mx-8">
    <h2 className="text-2xl my-6">
      {deck.name}
      <EditDeckDialog deck={deck} onEdit={ () => { getDeckById(id, setDeck) } } />
    </h2>
    <AddFlashcardDialog onAdd={ async () => { await getFlashcardListByDeckId(id, setFlashcards); } } deck={id} />
    <Button asChild>
      <Link to="/">Home</Link>
    </Button>
    <FlashcardsInDeckList flashcards={flashcards} setFlashcards={setFlashcards} deckId={id} />
  </div>;
}