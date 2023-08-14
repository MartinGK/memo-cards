"use client";
import { useState, useRef } from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import Textarea from "../Textarea";

const Card = styled.div`
  min-width: 20rem;
  min-height: 160px;
  padding: 2rem;
  padding-top: 4rem;
  margin-top: 4rem;
  background-color: orange;
  border-radius: 0.35rem;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
  perspective: 1000px;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: black;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const StyledArrowLeft = styled(FaArrowLeft)`
  cursor: pointer;
  position: absolute;
  top: -45px;
  left: -15px;
`;

export default function CardAddNewRelation() {
  const [relation, setRelation] = useState("");
  const [toRelate, setToRelate] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleKeyPressOnCardFrontSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      setIsCardFlipped(true);
      if (cardRef.current) cardRef.current.style.transform = "rotateY(180deg)";

      if (backCardTextareaRef.current) {
        backCardTextareaRef.current.focus();
        backCardTextareaRef.current.selectionEnd = 0;
        backCardTextareaRef.current.selectionStart = 0;
      }
    }
  };

  const backFlipCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "rotateY(0deg)";
  };

  const handleKeyPressOnCardBackSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // sendToTheSpace()
    }
  };

  const adjustTextareaHeight = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
    // const textarea = event.currentTarget;
    // textarea.style.height = "auto";
    // textarea.style.height = `${textarea.scrollHeight}px`;
    if (cardRef.current) {
      // cardRef.current.style.minHeight = `${textarea.scrollHeight + 100}px`
    }
  };

  return (
    <Card role="card" aria-label="card" ref={cardRef}>
      <CardInner ref={cardInnerRef}>
        <CardFront>
          <Textarea
            role="input"
            rows={5}
            wrap="hard"
            maxLength={90}
            autoFocus
            aria-label="relation-to-relate"
            onKeyDown={handleKeyPressOnCardFrontSide}
            onChange={(e) => setToRelate(e.target.value)}
            value={toRelate}
            onInput={adjustTextareaHeight}
          />
        </CardFront>
        <CardBack>
          <StyledArrowLeft onClick={backFlipCard} />
          <Textarea
            role="input"
            rows={3}
            wrap="hard"
            maxLength={90}
            onKeyDown={handleKeyPressOnCardBackSide}
            ref={backCardTextareaRef}
            aria-label="relation-to-learn"
            onChange={(e) => setRelation(e.target.value)}
            onInput={adjustTextareaHeight}
            value={relation}
          />
        </CardBack>
      </CardInner>
    </Card>
  );
}
