"use client";
import { styled } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import {
  ForwardedRef,
  useRef,
  ReactElement,
  forwardRef,
  useEffect,
} from "react";
import { reassignRef } from "../../lib/refs";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
};

const StyledCard = styled.div`
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
  animation: shrinkAnimation 1s ease-in-out;
  perspective: 1000px;

  @keyframes shrinkAnimation {
    ${() => {
      let result = "";
      for (let i = 0; i < 100; i++) {
        result += `${i}% {`;
        result += `transform:`;
        result += `translateY(${Math.tanh(i)}px) `;
        result += `translateX(${i * 7}px) `;
        result += `scale(${1 - i * 0.01}) `;
        result += `;}`;
      }
      return result;
    }}
  }
`;

const StyledCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const StyledCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: black;
`;

const StyledCardBack = styled.div`
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

/**
 *
 * @param cardDiv It should be cardRef.current
 */
export const flipCard = (cardDiv: HTMLDivElement | null) => {
  if (cardDiv) cardDiv.style.transform = "rotateY(180deg)";
};

const FlipCard = forwardRef((props: FlipCardProps, ref) => {
  const { frontContent, backContent, flipOnClick } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  const backFlip = () => {
    if (cardRef.current) cardRef.current.style.transform = "rotateY(0deg)";
  };

  const flip = () => {
    if (flipOnClick && cardRef.current) flipCard(cardRef.current);
  };

  useEffect(() => {
    reassignRef<HTMLDivElement>(ref, cardRef);
  }, [ref, cardRef, reassignRef]);

  return (
    <StyledCard role="card" aria-label="flip-card" ref={cardRef} onClick={flip}>
      <StyledCardInner className="card-inner">
        <StyledCardFront className="card-front">{frontContent}</StyledCardFront>
        <StyledCardBack className="card-back">
          <StyledArrowLeft
            className="card-arrow-left"
            onClick={backFlip}
            aria-label="flip-back"
            role="button"
          />
          {backContent}
        </StyledCardBack>
      </StyledCardInner>
    </StyledCard>
  );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
