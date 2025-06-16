import { useState } from "react";
import { addDeck } from "../ApiCalls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Deck } from "../../../common/types/Deck";

type AddDeckProps = {
  onAdd: () => void;
};

export function AddDeckDialog({onAdd}: AddDeckProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await addDeck(new Deck(name));

    if (ok) {
      setMessage('Deck added!');
      setName('');
      onAdd();
    } else {
      setMessage('There was a problem adding the deck...');
    }
  };

  return <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Deck</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Deck</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter deck name.</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="front">Front</Label>
              <Input
                placeholder="Name"
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