import { TCard, Card } from "@/app/store/Card";
import FlipCard from "../FlipCard";
import { useState } from "react";

type Props = {
  card: Card;
};

export default function MemoCard({ card }: Props) {
  const onFlipCardClick = () => {
    // card.flip();
  };

  return (
    <FlipCard
      frontContent={card.wordsToRelate}
      backContent={card.relationToRelate}
      onClick={onFlipCardClick}
    />
  );
}
