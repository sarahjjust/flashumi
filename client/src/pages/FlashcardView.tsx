import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getFlashcardById, updateFlashcard } from '../ApiCalls';
import { Card } from '../../../common/types/Card';

export function FlashcardView() {
  const id = parseInt(useParams().id!);
  const [flashcard, setFlashcard] = useState(new Card('', ''));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFlashcard = async () => {
      await getFlashcardById(id, setFlashcard);
    };
    fetchFlashcard();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateFlashcard(flashcard);

    if (ok) {
      await getFlashcardById(id, setFlashcard);
      setMessage('Flashcard updated!');
    } else {
      setMessage('There was a problem updating the card...');
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Question"
        value={flashcard.question}
        onChange={(e) => setFlashcard({ ...flashcard, question: e.target.value })}
      />
      <input
        placeholder="Answer"
        value={flashcard.answer}
        onChange={(e) => setFlashcard({ ...flashcard, answer: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
    <p>{message}</p>
    <Link to="/">Home</Link>
  </div>;
}
