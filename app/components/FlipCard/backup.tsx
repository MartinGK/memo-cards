"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRef, ReactElement, forwardRef, useEffect } from "react";
import { reassignRef } from "../../lib/refs";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const flipCard = (cardDiv: HTMLDivElement | null) => {
  cardDiv?.classList.remove("-rotate-y-180");
  cardDiv?.classList.add("rotate-y-0");
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const flipBackCard = (cardDiv: HTMLDivElement | null) => {
  cardDiv?.classList.remove("rotate-y-180");
  cardDiv?.classList.add("-rotate-y-0");
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const removeCardFromView = (cardDiv: HTMLDivElement | null) => {
  cardDiv?.classList.add("disappear-card");
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
    <div className="contents">
      <div
        className="min-w-[20rem] min-h-[160px] p-[2rem] pt-[4rem] mt-[4rem] bg-orange-400 rounded-md shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] transition-transform duration-[0.8s] transform-style-3d perspective-1000 box-content relative -rotate-y-180"
        role="card"
        aria-label="flip-card"
        ref={cardRef}
        onClick={flip}
      >
        <div className="card-inner absolute w-full h-full text-center transition-transform duration-[0.8s] transform-style-3d top-0 left-0">
          <div className="card-front relative top-0 left-0 box-content w-full h-full backface-hidden	text-black rotate-y-180">
            {frontContent}
          </div>
          <div className="card-back absolute top-0 left-0 box-content w-full h-full backface-hidden ">
            <FaArrowLeft
              className="card-arrow-left cursor-pointer absolute top-[-45px] left-[-15px]"
              onClick={backFlip}
              aria-label="flip-back"
              role="button"
            />
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
