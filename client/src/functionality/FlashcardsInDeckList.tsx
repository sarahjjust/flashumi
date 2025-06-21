import { useEffect } from "react";
import { deleteCardById, getFlashcardListByDeckId } from "../ApiCalls";
import { Link } from "react-router";
import { Card } from "../../../common/types/Card";
import { Card as CardComponent, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FlashcardInDeckListProps = {
  flashcards: Card[];
  onUpdate: () => void;
  deckId: number;
};

function delCard(card: Card, onUpdate: () => void) {
  if (card.id !== null) {
    deleteCardById(card.id, onUpdate);
  }
}

export function FlashcardsInDeckList({flashcards, onUpdate, deckId}: FlashcardInDeckListProps) {
  useEffect(() => {
    getFlashcardListByDeckId(deckId, onUpdate);
  }, []);
  
  if (!flashcards.length) {
    return <div>No cards yet...</div>;
  }

  return (
    <div>
      <h2 className="text-xl my-4">Flashcards</h2>
      <ul>
        {flashcards.map((card, index) => (
          <CardComponent key={index} className="bg-white dark:bg-gray-900">
            <CardContent>
              <p>Question: {card.question}</p>
              <p>Answer: {card.answer}</p>
              <p>Deck: {card.deck}</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                <Link to={`/flashcard/${card.id}`}>
                  Edit
                </Link>
              </Button>
              <Button onClick={ () => { delCard(card, onUpdate) } } size="sm" variant="destructive" className="ml-2">
                Delete
              </Button>
            </CardFooter>
          </CardComponent>
        ))}
      </ul>
    </div>
  );
}