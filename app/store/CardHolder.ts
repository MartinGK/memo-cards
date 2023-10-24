import { makeAutoObservable } from "mobx";
import { Card, TCard } from "./Card";
import { RootStore } from "./RootStore";
import uniqid from "uniqid";

export class CardHolder {
  _cards: TCard[] = [];
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get cards() {
    return this._cards;
  }

  get cardsLearned() {
    return this._cards.filter((c) => c.learned);
  }

  get cardsToLearn() {
    return this._cards.filter((c) => !c.learned);
  }

  init() {
    this.fetchCards();
  }

  fetchCards() {
    if (checkIfLocalStorageIsAvailable() && localStorage.getItem("cards")) {
      this._cards = JSON.parse(localStorage.getItem("cards") as string);
    }
  }

  createAndSaveCard({
    wordsToRelate,
    relationToRelate,
  }: {
    wordsToRelate: string;
    relationToRelate: string;
  }) {
    const card = Card.createCard({
      wordsToRelate,
      relationToRelate,
    });
    this.addCard(card);
  }

  addCard(card: Card) {
    this._cards.push(this.getCardDataToSave(card));
    this.save();
  }

  addCardAndCleanIt(card: Card) {
    this.addCard(card);
    this.cleanCard(card);
  }

  cleanCard = (card: Card) => {
    card.wordsToRelate = "";
    card.relationToRelate = "";
    card.learned = false;
    card.createdAt = new Date();
    card.id = uniqid();
  };

  save() {
    if (checkIfLocalStorageIsAvailable()) {
      localStorage.setItem("cards", JSON.stringify(this._cards));
    }
  }

  getCardById(id: string): TCard | undefined {
    return this._cards.find((c) => c.id === id);
  }

  saveCard(card: TCard) {
    const updatedCard = this.getCardDataToSave(card);
    this._cards.splice(
      this._cards.findIndex((c) => c.id === card.id),
      1,
      getCardRelevantDataToSave(updatedCard)
    );
    this.save();
  }

  private getCardDataToSave(card: TCard) {
    return {
      id: card.id,
      wordsToRelate: card.wordsToRelate,
      relationToRelate: card.relationToRelate,
      learned: card.learned,
      createdAt: card.createdAt,
    };
  }

  markCardAsLearned(card: TCard) {
    card.learned = true;
    this.saveCard(card);
  }

  markCardAsUnlearned(card: TCard) {
    card.learned = false;
    this.saveCard(card);
  }

  getRandomCardToLearn(): TCard | undefined {
    return this.cardsToLearn[
      Math.floor(Math.random() * this.cardsToLearn.length)
    ];
  }

  deleteCardById(id: string) {
    this._cards.splice(
      this._cards.findIndex((c) => c.id === id),
      1
    );
    this.save();
  }
}

const getCardRelevantDataToSave = (card: TCard) => {
  return {
    wordsToRelate: card.wordsToRelate,
    relationToRelate: card.relationToRelate,
    learned: card.learned,
    createdAt: card.createdAt,
    isFlipped: false,
    isDisappeared: false,
    id: card.id,
  };
};

const checkIfLocalStorageIsAvailable = () =>
  typeof localStorage !== "undefined";
