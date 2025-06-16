import { useState } from "react";
import { addFlashcard } from "../ApiCalls";
import { Card } from "../../../common/types/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type AddFlashcardProps = {
  onAdd: () => void;
  deck: number | null;
};

export function AddFlashcardDialog({onAdd, deck}: AddFlashcardProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Adding flashcard:', question, answer, deck);
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

  return <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Flashcard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Flashcard</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter flashcard information.</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="front">Front</Label>
              <Input
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="back">Back</Label>
              <Input
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <p style={{ color: "var(--color-chart-2)" }}>{message}</p>
            </div>
            <div className="grid gap-3">
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
}