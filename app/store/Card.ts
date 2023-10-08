import uniqid from "uniqid";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export type TCard = {
  wordsToRelate: string;
  relationToRelate: string;
  learned: boolean;
  createdAt: Date;
  id: string;
};

export class Card {
  _wordsToRelate: string;
  _relationToRelate: string;
  learned: boolean;
  createdAt: Date;
  id: string;

  constructor() {
    this._wordsToRelate = "";
    this._relationToRelate = "";
    this.learned = false;
    this.createdAt = new Date();
    this.id = uniqid();
    makeAutoObservable(this);
  }

  public static createFromCard = (card: TCard): Card => {
    const newCard = new Card();
    newCard.wordsToRelate = card.wordsToRelate;
    newCard.relationToRelate = card.relationToRelate;
    newCard.learned = card.learned;
    newCard.createdAt = card.createdAt;
    newCard.id = card.id;
    return newCard
  };

  get wordsToRelate() {
    return this._wordsToRelate;
  }

  set wordsToRelate(wordsToRelate: string) {
    this._wordsToRelate = wordsToRelate;
  }

  get relationToRelate() {
    return this._relationToRelate;
  }

  set relationToRelate(relationToRelate: string) {
    this._relationToRelate = relationToRelate;
  }

  setCard = (card: TCard | undefined) => {
    if (card === undefined) {
      return this.cleanCard();
    }
    this._wordsToRelate = card.wordsToRelate;
    this._relationToRelate = card.relationToRelate;
    this.learned = card.learned;
    this.createdAt = card.createdAt;
    this.id = card.id;
  };

  cleanCard = () => {
    this._wordsToRelate = "";
    this._relationToRelate = "";
    this.learned = false;
    this.createdAt = new Date();
    this.id = uniqid();
  };
}
