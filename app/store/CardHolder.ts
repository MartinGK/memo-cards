import { makeAutoObservable } from "mobx";
import { TCard } from "./Card";

class CardHolder {
  _cards: TCard[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get cards() {
    return this._cards;
  }

  get learnedCards() {
    return this._cards.filter(c => c.learned)
  }

  fetchCards() {
    if (localStorage && localStorage.getItem("cards")) {
      this._cards = JSON.parse(localStorage.getItem("cards") as string);
    }
  }

  addCard(card: TCard) {
    this._cards.push(card);
    this.save()
  }

  save() {
    if (localStorage) {
      localStorage.setItem("cards", JSON.stringify(this._cards));
    }
  }

  getCardById(id: string): TCard | undefined {
    return this._cards.find(c => c.id === id)
  }

  saveCard(card: TCard) {
    this._cards.splice(this._cards.findIndex(c => c.id === card.id), 1, card)
  }
}

const myCardHolder = new CardHolder();

export default myCardHolder;
