export class Deck {
  id: number | null;
  name: string;

  constructor(name: string, id: number | null = null) {
    this.name = name;
    this.id = id;
  }
}