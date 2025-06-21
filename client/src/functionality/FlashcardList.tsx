import { useEffect } from "react";
import { deleteCardById, getFlashcardList } from "@/ApiCalls";
import type { Card } from "../../../common/types/Card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card as CardComponent, CardContent, CardFooter } from "@/components/ui/card";
import { EditFlashcardDialog } from "./EditFlashcardDialog";

type FlashcardListProps = {
  flashcards: Card[];
  onUpdate: () => void;
};

function delCard(card: Card, onUpdate: () => void) {
  if (card.id !== null) {
    deleteCardById(card.id, onUpdate);
  }
}

export function FlashcardList({flashcards, onUpdate}: FlashcardListProps) {
  useEffect(() => {
    onUpdate();
  }, []);
  
  if (!flashcards.length) {
    return <div>No cards yet...</div>;
  }

  return (
    <div>
      <h2 className="text-xl my-6">Flashcards</h2>
      <ScrollArea className="h-180 w-200 rounded-md border p-4">
        <ul>
          {flashcards.map((card, index) => (
            <CardComponent key={index} className="bg-white dark:bg-gray-900">
              <CardContent>
                <p>Question: {card.question}</p>
                <p>Answer: {card.answer}</p>
                <p>Deck: {card.deck}</p>
              </CardContent>
              <CardFooter>
                <EditFlashcardDialog card={card} onEdit={ onUpdate } />
                <Button onClick={ () => { delCard(card, onUpdate) } } size="sm" variant="destructive" className="ml-2">
                  Delete
                </Button>
              </CardFooter>
            </CardComponent>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}