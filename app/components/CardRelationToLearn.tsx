"use client";
import { observer } from "mobx-react-lite";
import FlipCard, { flipCard } from "./FlipCard";
import { useRootStore } from "../contexts/RootStoreContext";
import { useRef } from "react";

const CardRelationToLearn = observer(() => {
  const { cardHolder } = useRootStore();
  const cardRef = useRef(null);
  const randomCardToLearn = cardHolder.getRandomCardToLearn();

  const onCardClick = () => {
    flipCard(cardRef.current);
  };

  return (
    <FlipCard
      onClick={onCardClick}
      ref={cardRef}
      frontContent={<span>{randomCardToLearn.wordsToRelate}</span>}
      backContent={<span>{randomCardToLearn.relationToRelate}</span>}
    />
  );
});

export default CardRelationToLearn;
