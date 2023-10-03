import uniqid from 'uniqid';
import { makeAutoObservable } from "mobx";
import { RootStore } from './RootStore';

export type TCard = {
  wordsToRelate: string;
  relationToRelate: string;
  learned: boolean;
  createdAt: Date;
  id: string;
};

export class Card {
  _card: TCard = {
    wordsToRelate: "",
    relationToRelate: "",
    learned: false,
    createdAt: new Date(),
    id: uniqid()
  };
  store: RootStore;

  constructor(store: RootStore) {
    this.store = store;
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
    this.store.cardHolder.addCard(this._card);
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
    const card = this.store.cardHolder.getCardById(id)
    if (card) {
      card.learned = true;
      this.store.cardHolder.saveCard(card)
    }
  }
}
