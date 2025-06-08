export async function getFlashcardById(id, setFlashcard) {
  const res = await fetch(`/api/flashcards/getcard/${id}`);
  if (res.ok) {
    const data = await res.json();
    setFlashcard(data);
  } else {
    const error = await res.json();
    console.error('Error fetching flashcard:', error);
  }
}

export async function getFlashcardList(setFlashcards) {
  const res = await fetch('/api/flashcards/getlist');
  if (res.ok) {
    const data = await res.json();
    setFlashcards(data);
  } else {
    console.error('Failed to fetch flashcards');
  }
}

export async function addFlashcard(card) {
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

export async function updateFlashcard(id, question, answer) {
  const res = await fetch('/api/flashcards/updatecard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, question, answer }),
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

export async function deleteCardById(id, setFlashcards) {
  const res = await fetch('/api/flashcards/deletecard/id', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
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