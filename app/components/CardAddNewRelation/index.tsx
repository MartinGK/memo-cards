"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import Textarea from "../Textarea";
import {
  CARD_TEXTAREA_MAX_CHARACTERS,
  PRESS_ENTER_MESSAGE,
} from "../../utils/constants";
import Tooltip from "../Tooltip";

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

const CardContainer = styled.div`
  position: relative;
  display: contents;
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
  const [showPressStartButton, setShowPressStartButton] = useState(false);
  const [maxHeightForTextarea, setMaxHeightForTextarea] = useState(0);
  const backCardTextareaRef = useRef<HTMLTextAreaElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleKeyPressOnCardFrontSide = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
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
    if (event.key === "Enter") {
      // sendToTheSpace() BAD NAME!!!
    }
  };

  const adjustHeightAndLimitMaxCharacters = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.currentTarget;
    adjustTextareaHeight(textarea);
    limitMaxTextareaCharacters(textarea);
  };

  const limitMaxTextareaCharacters = (textarea: HTMLTextAreaElement) => {
    if (textarea.value.length > CARD_TEXTAREA_MAX_CHARACTERS) {
      textarea.value = textarea.value.slice(0, -1);
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    if (maxHeightForTextarea > textarea.scrollHeight) {
      textarea.style.height = `${maxHeightForTextarea}px`;
    }
  };

  const locateCaretAtTheEnd = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const len = event.target.value.length;
    event.target.selectionStart = len;
    event.target.selectionEnd = len;
  };

  useEffect(() => {
    if (backCardTextareaRef.current?.scrollHeight) {
      setMaxHeightForTextarea(backCardTextareaRef.current?.scrollHeight);
    }
  }, []);

  return (
    <>
      <Card
        role="card"
        aria-label="card"
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
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
              onFocus={locateCaretAtTheEnd}
              onInput={adjustHeightAndLimitMaxCharacters}
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
              onInput={adjustHeightAndLimitMaxCharacters}
              onFocus={locateCaretAtTheEnd}
              value={relation}
            />
          </CardBack>
        </CardInner>
      </Card>
      <button onClick={() => setShowPressStartButton((prev) => !prev)}>TEst</button>
      <Tooltip
        message={PRESS_ENTER_MESSAGE}
        isOpen={showPressStartButton}
      />
    </>
  );
}
