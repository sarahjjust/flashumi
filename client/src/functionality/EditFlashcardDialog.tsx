import { useState } from "react";
import { updateFlashcard } from "../ApiCalls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card } from "../../../common/types/Card";

type EditFlashcardProps =
{
  card: Card;
  onEdit: () => void;
};

export function EditFlashcardDialog({card, onEdit}: EditFlashcardProps) {
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await updateFlashcard(new Card(question, answer, card.id));

    if (ok) {
      setMessage('Deck added!');
      onEdit();
    } else {
      setMessage('There was a problem adding the card...');
    }

    setOpen(false);
  };

  const handleOpenChange = () => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setMessage('');
    setOpen(!open);
  };

  return <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter new card name.</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="question">Question</Label>
              <Input
                placeholder={card.question}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="answer">Answer</Label>
              <Input
                placeholder={card.answer}
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