import { makeAutoObservable } from "mobx";
import CardHolder from "./CardHolder";

export type TCard = {
  wordsToRelate: string;
  relationToRelate: string;
};

class Card {
  _card: TCard = {
    wordsToRelate: "",
    relationToRelate: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  get card() {
    return this._card;
  }

  get wordsToRelate() {
    return this._card.wordsToRelate;
  }

  set wordsToRelate(words: string) {
    this._card.wordsToRelate = words;
  }

  get relationToRelate() {
    return this._card.relationToRelate;
  }

  set card(card) {
    this._card = card;
  }

  set relationToRelate(relation: string) {
    this._card.relationToRelate = relation;
  }

  addToDatabase() {
    CardHolder.addCard(this._card);
  }

  cleanCard() {
    this._card = {
      wordsToRelate: "",
      relationToRelate: "",
    };
  }
}

const myCard = new Card();

export default myCard;
