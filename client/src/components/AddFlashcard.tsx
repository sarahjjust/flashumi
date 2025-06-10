import { useState } from "react";
import { addFlashcard } from "../ApiCalls";
import { Card } from "../../../common/types/Card";

export function AddFlashcard({onAdd, deck}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await addFlashcard(new Card(question, answer, null, deck));

    if (ok) {
      setMessage('Flashcard added!');
      setQuestion('');
      setAnswer('');
      onAdd();
    } else {
      setMessage('There was a problem adding the card...');
    }
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
    <p>{message}</p>
  </div>
}