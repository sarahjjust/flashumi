export class Card {
  id: number | null;
  question: string;
  answer: string;
  deck_id: number | null;

  constructor(question: string, answer: string, id: number | null = null, deck_id: number | null = null) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.deck_id = deck_id;
  }
}