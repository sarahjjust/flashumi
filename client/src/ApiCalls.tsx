import { Card } from '../../common/types/Card';
import { Deck } from '../../common/types/Deck';

export async function getFlashcardById(id: number, setFlashcard: (card: Card) => void) {
  const res = await fetch(`/api/flashcards/getcard/${id}`);
  if (res.ok) {
    const data = await res.json();
    setFlashcard(data as Card);
  } else {
    const error = await res.json();
    console.error('Error fetching flashcard:', error);
  }
}

export async function getDeckById(id: number, setDeck: (deck: Deck) => void) {
  const res = await fetch(`/api/decks/getdeck/${id}`);
  if (res.ok) {
    const data = await res.json();
    setDeck(data as Deck);
  } else {
    const error = await res.json();
    console.error('Error fetching deck:', error);
  }
}

export async function getFlashcardList(setFlashcards: (cards: Card[]) => void) {
  const res = await fetch('/api/flashcards/getlist');
  if (res.ok) {
    const data = await res.json();
    setFlashcards(data as Card[]);
  } else {
    console.error('Failed to fetch flashcards');
  }
}

export async function getDeckList(setDecks: (decks: Deck[]) => void) {
  const res = await fetch('/api/decks/getlist');
  if (res.ok) {
    const data = await res.json();
    setDecks(data as Deck[]);
  } else {
    console.error('Failed to fetch decks');
  }
}

export async function addFlashcard(card: Card): Promise<boolean> {
  const res = await fetch('/api/flashcards/addcard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Added card:', data);
    return true;
  } else {
    const error = await res.json();
    console.error('Error: ' + error.error);
    return false;
  }
};

export async function addDeck(deck: Deck): Promise<boolean> {
  const res = await fetch('/api/decks/adddeck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Added deck:', data);
    return true;
  } else {
    const error = await res.json();
    console.error('Error: ' + error.error);
    return false;
  }
};

export async function updateFlashcard(card: Card): Promise<boolean> {
  const res = await fetch('/api/flashcards/updatecard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Updated card:', data);
    return true;
  } else {
    const error = await res.json();
    console.error('Error updating card:', error);
    return false;
  }
};

export async function updateDeck(deck: Deck): Promise<boolean> {
  const res = await fetch('/api/decks/updatedeck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Updated deck:', data);
    return true;
  } else {
    const error = await res.json();
    console.error('Error updating deck:', error);
    return false;
  }
};

export async function deleteCardById(id: number, setFlashcards: (cards: Card[]) => void) {
  const res = await fetch(`/api/flashcards/deletecard/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Deleted card:', data);
    getFlashcardList(setFlashcards);
  } else {
    const error = await res.json();
    console.error('Error deleting card:', error);
  }
}

export async function deleteDeckById(id: number, setDecks: (decks: Deck[]) => void) {
  const res = await fetch(`/api/decks/deletedeck/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Deleted deck:', data);
    getDeckList(setDecks);
  } else {
    const error = await res.json();
    console.error('Error deleting deck:', error);
  }
}