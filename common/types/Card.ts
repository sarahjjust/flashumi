export class Card {
  id: number | null;
  question: string;
  answer: string;
  deck: number | null;

  constructor(question: string, answer: string, id: number | null = null, deck: number | null = null) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.deck = deck;
  }
}