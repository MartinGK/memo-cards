'use client'
import { observer } from "mobx-react-lite";
import { useRootStore } from "../contexts/RootStoreContext";
import { TCard, Card } from "../store/Card";
import { useEffect, useState } from "react";
import CardLearned from "../components/CardLearned";

const Learned = observer(() => {
  const { cardHolder } = useRootStore();
  const [cards, setCards] = useState<TCard[]>([]);

  useEffect(() => {
    if (cardHolder.cardsLearned.length) {
      setCards(cardHolder.cardsLearned);
    }
  }, []);

  return (
    <>
      {cards.map((card) => (
        <CardLearned card={Card.createFromCard(card)} key={`card-learned-${card.id}`} />
      ))}
    </>
  );
});

export default Learned;
