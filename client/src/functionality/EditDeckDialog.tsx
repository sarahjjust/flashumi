import { useState } from "react";
import { updateDeck } from "../ApiCalls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Deck } from "../../../common/types/Deck";

type EditDeckProps = {
  deck: Deck;
  onEdit: () => void;
};

export function EditDeckDialog({deck, onEdit}: EditDeckProps) {
  const [name, setName] = useState(deck.name);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await updateDeck(new Deck(name, deck.id));

    if (ok) {
      setMessage('Deck added!');
      setName('');
      onEdit();
    } else {
      setMessage('There was a problem adding the deck...');
    }

    setOpen(false);
  };

  const handleOpenChange = () => {
    setName(deck.name);
    setMessage('');
    setOpen(!open);
  };

  return <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter new deck name.</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Deck Name</Label>
              <Input
                placeholder={deck.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
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