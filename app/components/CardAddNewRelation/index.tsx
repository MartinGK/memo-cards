"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Textarea from "../Textarea";
import FlipCard from "../FlipCard";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/contexts/RootStoreContext";
import { Card } from "@/app/store/Card";
import { trace } from "mobx";

const focusOnTextareaRef = (ref: React.RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    ref.current.focus();
    ref.current.selectionEnd = 0;
    ref.current.selectionStart = 0;
  }
};

const CardAddNewRelation = observer(() => {
  // trace(true);
  const { cardHolder } = useRootStore();
  const [card] = useState(() => new Card());
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);
  const frontCardTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onFrontContentStartPress = useCallback(() => {
    card.relationToRelate = "";
    focusOnTextareaRef(backCardTextareaRef);
  }, [card.wordsToRelate, card.relationToRelate]);

  const onBackContentStartPress = useCallback(() => {
    if (card.relationToRelate.length) {
      cardHolder.addCardAndCleanIt(card);
      focusOnTextareaRef(frontCardTextareaRef);
    }
  }, [card.wordsToRelate, card.relationToRelate]);

  const handleChangeFrontCardTextarea = (e: any) => {
    card.wordsToRelate = e.target.value;
  };

  const handleChangeBackCardTextarea = (e: any) => {
    card.relationToRelate = e.target.value;
  };

  return (
    <FlipCard
      flipOnStartPress
      disappearOnStartPressAtBackContent
      onFrontContentStartPress={onFrontContentStartPress}
      onBackContentStartPress={onBackContentStartPress}
      frontContent={
        <Textarea
          autoFocus
          name="words-to-relate"
          ref={frontCardTextareaRef}
          aria-label="relation-to-relate"
          onChange={handleChangeFrontCardTextarea}
          value={card.wordsToRelate}
        />
      }
      backContent={
        <Textarea
          name="relation-to-learn"
          ref={backCardTextareaRef}
          aria-label="relation-to-learn"
          onChange={handleChangeBackCardTextarea}
          value={card.relationToRelate}
        />
      }
    />
  );
});

export default CardAddNewRelation;
