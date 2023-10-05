import uniqid from "uniqid";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export type TCard = {
  wordsToRelate: string;
  relationToRelate: string;
  learned: boolean;
  isFlipped: boolean;
  isDisappeared: boolean;
  createdAt: Date;
  id: string;
};

export class Card {
  wordsToRelate: string;
  relationToRelate: string;
  learned: boolean;
  createdAt: Date;
  isFlipped: boolean;
  isDisappeared: boolean;
  id: string;
  store: RootStore;

  constructor(store: RootStore) {
    this.wordsToRelate = "";
    this.relationToRelate = "";
    this.learned = false;
    this.createdAt = new Date();
    this.isFlipped = false;
    this.isDisappeared = false;
    this.id = uniqid();
    this.store = store;
    makeAutoObservable(this);
  }

  setCard(card: TCard) {
    this.wordsToRelate = card.wordsToRelate;
    this.relationToRelate = card.relationToRelate;
    this.learned = card.learned;
    this.createdAt = card.createdAt;
    this.isFlipped = card.isFlipped;
    this.id = card.id;
  }

  addToDatabase() {
    this.createdAt = new Date();
    this.store.cardHolder.addCard({
      wordsToRelate: this.wordsToRelate,
      relationToRelate: this.relationToRelate,
      learned: this.learned,
      createdAt: this.createdAt,
      isFlipped: this.isFlipped,
      isDisappeared: this.isDisappeared,
      id: this.id,
    });
  }

  flip() {
    this.isFlipped = true;
  }

  flipBack() {
    this.isFlipped = false;
  }

  disappearCard() {
    this.isDisappeared = true;
  }

  appearCard() {
    this.isDisappeared = false;
  }

  cleanCard() {
    this.wordsToRelate = "";
    this.relationToRelate = "";
    this.learned = false;
    this.createdAt = new Date();
    this.isFlipped = false;
    this.isDisappeared = false;
    this.id = uniqid();
  }

  markAsLearned(id: string) {
    const card = this.store.cardHolder.getCardById(id);
    if (card) {
      this.learned = true;
      this.store.cardHolder.saveCard(card);
    }
  }
}
