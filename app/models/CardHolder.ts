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

  fetchCards() {
    if (localStorage && localStorage.getItem("cards")) {
      this._cards = JSON.parse(localStorage.getItem("cards") as string);
    }
  }

  addCard(card: TCard) {
    this._cards.push(card);
    //save to localStorage
    if (localStorage) {
      localStorage.setItem("cards", JSON.stringify(this._cards));
    }
  }
}

const myCardHolder = new CardHolder();

export default myCardHolder;
