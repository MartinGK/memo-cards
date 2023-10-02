import uniqid from 'uniqid';
import { makeAutoObservable } from "mobx";
import CardHolder from "./CardHolder";

export type TCard = {
  wordsToRelate: string;
  relationToRelate: string;
  learned: boolean;
  createdAt: Date;
  id: string;
};

class Card {
  _card: TCard = {
    wordsToRelate: "",
    relationToRelate: "",
    learned: false,
    createdAt: new Date(),
    id: uniqid()
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
    this._card.createdAt = new Date();
    CardHolder.addCard(this._card);
    this.cleanCard();
  }

  cleanCard() {
    this._card = {
      wordsToRelate: "",
      relationToRelate: "",
      learned: false,
      createdAt: new Date(),
      id: uniqid()
    };
  }

  markAsLearned(id: string) {
    const card = CardHolder.getCardById(id)
    if (card) {
      card.learned = true;
      CardHolder.saveCard(card)
    }
  }
}

const myCard = new Card();

export default myCard;
