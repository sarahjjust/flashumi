import { useState } from "react";
import { addFlashcard } from "../ApiCalls";
import { Card } from "../../../common/types/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AddFlashcardProps = {
  onAdd: () => void;
  deck: number | null;
};

export function AddFlashcard({onAdd, deck}: AddFlashcardProps) {
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
      <Input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button type="submit" className="cursor-pointer">Add</Button>
    </form>
    <p>{message}</p>
  </div>
}