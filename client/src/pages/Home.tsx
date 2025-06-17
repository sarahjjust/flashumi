import { Link } from 'react-router';
import { useState } from 'react';
import { getFlashcardList} from '../ApiCalls';
import { Card } from '../../../common/types/Card';
import { AddFlashcardDialog } from '../functionality/AddFlashcardDialog';
import { FlashcardList } from '../functionality/FlashcardList';
import { Button } from '@/components/ui/button';

export function Home() {
  const [flashcards, setFlashcards] = useState([] as Card[]);

  return <div className="mx-8">
    <h1 className="scroll-m-20 text-4xl my-6 font-extrabold tracking-tight text-balance">FlashMe!</h1>
    <Button asChild>
      <Link to="/decks">Create a New Deck</Link>
    </Button>
    <AddFlashcardDialog onAdd={ async () => { await getFlashcardList(setFlashcards); } } deck={null} />
    <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
  </div>
}
