import { useEffect } from "react";
import { Link } from "react-router";
import { deleteCardById, getFlashcardList } from "@/ApiCalls";
import type { Card } from "../../../common/types/Card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card as CardComponent, CardContent, CardFooter } from "@/components/ui/card";
import { EditFlashcardDialog } from "./EditFlashcardDialog";

type FlashcardListProps = {
  flashcards: Card[];
  setFlashcards: React.Dispatch<React.SetStateAction<Card[]>>;
};

function delCard(card: Card, setFlashcards: React.Dispatch<React.SetStateAction<Card[]>>) {
  if (card.id !== null) {
    deleteCardById(card.id, setFlashcards);
  }
}

export function FlashcardList({flashcards, setFlashcards}: FlashcardListProps) {
  useEffect(() => {
    getFlashcardList(setFlashcards);
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
                <EditFlashcardDialog card={card} onEdit={ () => getFlashcardList(setFlashcards) } />
                <Button onClick={ () => { delCard(card, setFlashcards) } } size="sm" variant="destructive" className="ml-2">
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