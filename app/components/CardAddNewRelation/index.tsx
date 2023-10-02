"use client";
import { useRef } from "react";
import Textarea from "../Textarea";
import FlipCard, { flipCard } from "../FlipCard";
import myCard, { type TCard } from "@/app/models/Card";
import { observer } from "mobx-react-lite";

const focusOnTextareaRef = (ref: React.RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    ref.current.focus();
    ref.current.selectionEnd = 0;
    ref.current.selectionStart = 0;
  }
};

type Props = { card: TCard };

const CardAddNewRelation = observer(({ card }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      flipCard(cardRef.current);
      focusOnTextareaRef(backCardTextareaRef);
    }
  };

  const addCardToStorage = () => {
    myCard.addToDatabase;
  };

  const handleKeyPressOnCardBackSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCardToStorage();
    }
  };

  return (
    <FlipCard
      ref={cardRef}
      frontContent={
        <Textarea
          autoFocus
          name="words-to-relate"
          aria-label="relation-to-relate"
          onKeyDown={onKeyDown}
          onChange={(e) => (card.wordsToRelate = e.target.value)}
          value={card.wordsToRelate}
        />
      }
      backContent={
        <Textarea
          onKeyDown={handleKeyPressOnCardBackSide}
          name="relation-to-learn"
          ref={backCardTextareaRef}
          aria-label="relation-to-learn"
          onChange={(e) => (myCard.relationToRelate = e.target.value)}
          value={myCard.relationToRelate}
        />
      }
    />
  );
});

export default CardAddNewRelation;
