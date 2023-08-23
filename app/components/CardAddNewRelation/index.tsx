"use client";
import { useState, useRef } from "react";
import Textarea from "../Textarea";
import FlipCard, { flipCard } from "../FlipCard";
// import StorageUseCase from "@/app/usecases/StorageUseCase";

const focusOnTextareaRef = (ref: React.RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    ref.current.focus();
    ref.current.selectionEnd = 0;
    ref.current.selectionStart = 0;
  }
};

export default function CardAddNewRelation() {
  const [relation, setRelation] = useState("");
  const [toRelate, setToRelate] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      flipCard(cardRef.current);
      focusOnTextareaRef(backCardTextareaRef);
    }
  };

  type addToStorageParams = {
    relation: string;
    toRelate: string;
  };

  const addToStorage = ({ relation, toRelate }: addToStorageParams) => {
    // const storage = new StorageUseCase();
    // storage.writeItem(relation, toRelate);
  };

  const handleKeyPressOnCardBackSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      // sendToTheSpace() BAD NAME!!!
      addToStorage({ relation, toRelate });
    }
  };

  return (
    <FlipCard
      ref={cardRef}
      frontContent={
        <Textarea
          autoFocus
          aria-label="relation-to-relate"
          onKeyDown={onKeyDown}
          onChange={(e) => setToRelate(e.target.value)}
          value={toRelate}
        />
      }
      backContent={
        <Textarea
          onKeyDown={handleKeyPressOnCardBackSide}
          ref={backCardTextareaRef}
          aria-label="relation-to-learn"
          onChange={(e) => setRelation(e.target.value)}
          value={relation}
        />
      }
    />
  );
}
