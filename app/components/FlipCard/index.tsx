"use client";
import { FaArrowLeft } from "react-icons/fa";
import { ReactElement, forwardRef, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/contexts/RootStoreContext";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
  isFlipped?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

/**
 *
 * @param cardDiv It should be flipCardRef.current
 */
export const disappearCard = (cardDiv: HTMLDivElement | null) => {
  if (cardDiv) {
    cardDiv?.classList.remove("animate-delay-500");
    cardDiv?.classList.add("animate-ping");
    setTimeout(() => {
      cardDiv?.classList.remove("animate-ping");
      cardDiv?.classList.add("animate-delay-500");
      cardDiv?.classList.add("animate-jump-in");
    }, 500);
  }
};

const FlipCard = observer(
  forwardRef(
    (
      props: FlipCardProps,
      ref:
        | React.ForwardedRef<unknown>
        | React.MutableRefObject<HTMLDivElement | null>
    ) => {
      const [cardClass, setCardClass] = useState("");
      const { card } = useRootStore();
      const { frontContent, backContent, onClick } = props;

      const backFlipCard = () => {
        card.flipBack();
      };

      useEffect(() => {
        if (card.isDisappeared) {
          setCardClass("animate-ping");
        } else {
          setCardClass("animate-delay-500 animate-jump-in");
        }
      }, [card.isDisappeared]);

      return (
        <div
          className={`min-w-[20rem] min-h-[160px] p-[2rem] pt-[4rem] mt-[4rem] transition-transform duration-[0.8s] transform-style-3d perspective-1000 box-content relative animate-once animate-jump-in ${cardClass}`}
          role="card"
          aria-label="flip-card"
          onClick={onClick}
        >
          <div
            className={`card-inner absolute w-full  h-full text-center transition-transform duration-[0.8s] transform-style-3d top-0 left-0 ${
              card.isFlipped ? "rotate-y-0" : "-rotate-y-180"
            }`}
          >
            <div className="card-front absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5 bg-orange-400 rounded-xl -rotate-y-180">
              {frontContent}
            </div>
            <div
              className={`card-back absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5 bg-red-400 rounded-xl `}
            >
              <FaArrowLeft
                className="card-arrow-left cursor-pointer absolute top-4 left-5 z-10"
                onClick={backFlipCard}
                aria-label="flip-back"
                role="button"
              />
              {backContent}
            </div>
          </div>
        </div>
      );
    }
  )
);

export default FlipCard;
