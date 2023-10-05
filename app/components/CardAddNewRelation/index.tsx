"use client";
import { useRef } from "react";
import Textarea from "../Textarea";
import FlipCard from "../FlipCard";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/contexts/RootStoreContext";

const focusOnTextareaRef = (ref: React.RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    ref.current.focus();
    ref.current.selectionEnd = 0;
    ref.current.selectionStart = 0;
  }
};

const CardAddNewRelation = observer(() => {
  const { card } = useRootStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      card.flip();
      focusOnTextareaRef(backCardTextareaRef);
    }
  };

  const handleKeyPressOnCardBackSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      card.addToDatabase();
      card.disappearCard();
      setTimeout(() =>{
        card.cleanCard();
        card.appearCard();
      }, 500)
    }
  };

  return (
    <FlipCard
      ref={cardRef}
      // isFlipped={isFlipped}
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
          onChange={(e) => (card.relationToRelate = e.target.value)}
          value={card.relationToRelate}
        />
      }
    />
  );
});

export default CardAddNewRelation;
