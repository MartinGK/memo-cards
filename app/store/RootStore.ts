import { CardHolder } from "./CardHolder";
import { Card } from "./Card";

export class RootStore {
  cardHolder: CardHolder;
  // card: Card;

  constructor() {
    this.cardHolder = new CardHolder(this);
    // this.card = new Card(this);

    this.cardHolder.init();
  }
}
