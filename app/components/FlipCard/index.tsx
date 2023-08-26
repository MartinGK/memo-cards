"use client";
import { styled } from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useRef, ReactElement, forwardRef, useEffect } from "react";
import { reassignRef } from "../../lib/refs";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
};

const CardContainer = styled.div`
  display: contents;
  & .flip {
    transform: rotateY(180deg);
  }
  & .flip-back {
    transform: rotateY(0deg);
  }
`;
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

  @keyframes shrinkAnimation {
    ${() => {
      let result = "";
      for (let i = 0; i < 20; i++) {
        result += `${i}% {`;
        result += `opacity: ${1 / i};`;
        result += `transform:`;
        // result += `translateY(${i * 7}px) `;
        result += `translateX(${i * 70}px) `;
        result += `;}`;
      }
      return result;
    }}
  }
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

const ArrowLeft = styled(FaArrowLeft)`
  cursor: pointer;
  position: absolute;
  top: -45px;
  left: -15px;
`;

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const flipCard = (cardDiv: HTMLDivElement | null) => {
  cardDiv?.classList.remove("flip-back");
  cardDiv?.classList.add("flip");
  // if (cardDiv) cardDiv.style.transform = "rotateY(180deg)";
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const flipBackCard = (cardDiv: HTMLDivElement | null) => {
  // console.log(cardDiv?.classList.add("flip-back"));
  cardDiv?.classList.remove("flip");
  cardDiv?.classList.add("flip-back");
  // if (cardDiv) cardDiv.style.transform = "rotateY(0deg)";
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const removeCardFromView = (cardDiv: HTMLDivElement | null) => {
  if (cardDiv) cardDiv.style.animation = "shrinkAnimation 1s ease-in-out";
};

const FlipCard = forwardRef((props: FlipCardProps, ref) => {
  const { frontContent, backContent, flipOnClick } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  const backFlip = () => {
    if (cardRef.current) flipBackCard(cardRef.current);
  };

  const flip = () => {
    if (flipOnClick && cardRef.current) flipCard(cardRef.current);
  };

  useEffect(() => {
    reassignRef<HTMLDivElement>(ref, cardRef);
  }, [ref, cardRef]);

  return (
    <CardContainer>
      <Card role="card" aria-label="flip-card" ref={cardRef} onClick={flip}>
        <CardInner className="card-inner">
          <CardFront className="card-front">{frontContent}</CardFront>
          <CardBack className="card-back">
            <ArrowLeft
              className="card-arrow-left"
              onClick={backFlip}
              aria-label="flip-back"
              role="button"
            />
            {backContent}
          </CardBack>
        </CardInner>
      </Card>
    </CardContainer>
  );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
