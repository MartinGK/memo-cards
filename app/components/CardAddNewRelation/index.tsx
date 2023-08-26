"use client";
import { useState, useRef } from "react";
import Textarea from "../Textarea";
import FlipCard, { flipCard, removeCardFromView } from "../FlipCard";
import LocalStorageUseCase from "../../usecases/localStorageUseCase";

const storage = new LocalStorageUseCase();

const focusOnTextareaRef = (ref: React.RefObject<HTMLTextAreaElement>) => {
  if (ref.current) {
    ref.current.focus();
    ref.current.selectionEnd = 0;
    ref.current.selectionStart = 0;
  }
};

type addToStorageParams = {
  toRelate: string;
  toLearn: string;
};

export default function CardAddNewRelation() {
  const [toLearn, setToLearn] = useState("");
  const [toRelate, setToRelate] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      flipCard(cardRef.current);
      focusOnTextareaRef(backCardTextareaRef);
    }
  };

  const addToStorage = ({ toRelate, toLearn }: addToStorageParams) => {
    storage.writeItem(toRelate, toLearn);
  };

  const handleKeyPressOnCardBackSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      removeCardFromView(cardRef.current);
      event.preventDefault();
      addToStorage({ toRelate, toLearn });
    }
  };

  return (
    <div>
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
            onChange={(e) => setToLearn(e.target.value)}
            value={toLearn}
          />
        }
      />
    </div>
  );
}
