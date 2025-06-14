import { Link } from 'react-router';
import { useState } from 'react';
import { getFlashcardList} from '../ApiCalls';
import { Card } from '../../../common/types/Card';
import { AddFlashcard } from '../functionality/AddFlashcard';
import { FlashcardList } from '../functionality/FlashcardList';
import { Button } from '@/components/ui/button';

export function Home() {
  const [flashcards, setFlashcards] = useState([] as Card[]);

  return <div>
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>Flashumi</h1>
    <Button asChild>
      <Link to="/newdeck">Create a New Deck</Link>
    </Button>
    <AddFlashcard onAdd={ async () => { await getFlashcardList(setFlashcards); } } deck={null} />
    <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
  </div>
}
