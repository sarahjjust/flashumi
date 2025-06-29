import { useEffect } from "react";
import { deleteDeckById } from "../ApiCalls";
import { Deck } from "../../../common/types/Deck";
import { Card as CardComponent, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditDeckDialog } from "./EditDeckDialog";
import { Link } from "react-router";

type DeckListProps = {
  decks: Deck[];
  onUpdate: () => void;
};

function delDeck(deck: Deck, onUpdate: ( ) => void) {
  if (deck.id !== null) {
    deleteDeckById(deck.id, onUpdate);
  }
}

export function DeckList({decks, onUpdate}: DeckListProps) {
  useEffect(() => {
    onUpdate();
  }, []);
  
  if (!decks.length) {
    return <div>No decks yet...</div>;
  }

  return (
    <div>
      <h2 className="text-xl my-4">Decks</h2>
      <ul>
        {decks.map((deck, index) => (
          <CardComponent key={index} className="bg-white dark:bg-gray-900">
            <CardContent>
              <p>{deck.id} - {deck.name}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to={`/deck/${deck.id}`}>
                  View
                </Link>
              </Button>
              <EditDeckDialog deck={deck} onEdit={onUpdate} />
              <Button onClick={ () => { delDeck(deck, onUpdate) } } size="sm" variant="destructive" className="ml-2">
                Delete
              </Button>
            </CardFooter>
          </CardComponent>
        ))}
      </ul>
    </div>
  );
}