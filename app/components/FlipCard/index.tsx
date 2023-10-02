"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRef, ReactElement, forwardRef, useEffect } from "react";
import { reassignRef } from "../../lib/refs";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
  isFlipped?: boolean;
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
  if (cardDiv) {
    cardDiv?.classList.add("-rotate-y-180");
    cardDiv?.classList.remove("rotate-y-0");
  }
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const removeCardFromView = (cardDiv: HTMLDivElement | null) => {
  if (cardDiv) {
    cardDiv?.classList.add("disappear-card");
  }
};

function FlipCard(
  props: FlipCardProps,
  ref:
    | React.ForwardedRef<unknown>
    | React.MutableRefObject<HTMLDivElement | null>
) {
  const { frontContent, backContent, isFlipped } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  const backFlip = () => {
    flipBackCard(cardRef.current);
  };

  useEffect(() => {
    reassignRef<HTMLDivElement>(ref, cardRef);
  }, [ref, cardRef]);

  useEffect(() => {
    if (isFlipped) {
      flipCard(cardRef.current);
    } 
  }, [isFlipped]);

  return (
    <div className="contents">
      <div
        className="min-w-[20rem] min-h-[160px] p-[2rem] pt-[4rem] mt-[4rem] bg-orange-400 rounded-md  transition-transform duration-[0.8s] transform-style-3d perspective-1000 box-content relative -rotate-y-180"
        role="card"
        aria-label="flip-card"
        ref={cardRef}
      >
        <div className="card-inner absolute w-full h-full text-center transition-transform duration-[0.8s] transform-style-3d top-0 left-0 ">
          <div className="card-front absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5 rotate-y-180 ">
            {frontContent}
          </div>
          <div className="card-back absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5">
            <FaArrowLeft
              className="card-arrow-left cursor-pointer absolute top-4 left-5"
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
}

export default forwardRef(FlipCard);
