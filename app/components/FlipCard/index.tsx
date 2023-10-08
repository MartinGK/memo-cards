"use client";
import { FaArrowLeft } from "react-icons/fa";
import { CgRedo } from "react-icons/cg";
import { ReactElement, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

type FlipCardProps = {
  frontContent: ReactElement | string;
  backContent: ReactElement | string;
  flipOnClick?: boolean;
  flipOnStartPress?: boolean;
  disappearOnStartPress?: boolean;
  isFlipped?: boolean;
  bringNewCard?: boolean;
  disappearOnStartPressAtBackContent?: boolean;
  isDisappeared?: boolean;
  showRedo?: boolean;
  onClickRedo?: React.MouseEventHandler<SVGElement>;
  onStartPress?: () => void;
  onFrontContentStartPress?: () => void;
  onBackContentStartPress?: () => void;
  onBackFlip?: React.MouseEventHandler<SVGElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const FlipCard = observer((props: FlipCardProps) => {
  const [cardClass, setCardClass] = useState("");
  const {
    frontContent,
    backContent,
    onClick,
    flipOnClick,
    onBackFlip,
    flipOnStartPress,
    disappearOnStartPress,
    bringNewCard,
    showRedo,
    onClickRedo,
    onStartPress,
    onFrontContentStartPress,
    onBackContentStartPress,
    disappearOnStartPressAtBackContent,
  } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDisappeared, setIsDisappeared] = useState(props.isDisappeared);

  const backFlipCard = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped(false);
    if (onBackFlip) onBackFlip(e);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (flipOnClick) setIsFlipped(true);
    if (onClick) onClick(e);
  };

  const handleClickRedo = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setIsDisappeared(true);
    if (onClickRedo) onClickRedo(e);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (onStartPress) onStartPress();
      if (flipOnStartPress) setIsFlipped(true);
      if (props.isDisappeared) setIsDisappeared(true);
    }
  };

  const onFrontContentKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      if (onFrontContentStartPress) onFrontContentStartPress();
    }
  };

  const onBackContentKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (disappearOnStartPressAtBackContent) {
        setIsDisappeared(true);
        setTimeout(() => {
          setIsDisappeared(false);
          setIsFlipped(false);
        }, 500);
      }
      if (onBackContentStartPress) onBackContentStartPress();
    }
  };

  useEffect(() => {
    if (isDisappeared) {
      setCardClass("animate-ping-hidden");
    } else {
      setCardClass("animate-delay-500 animate-jump-in");
    }
  }, [isDisappeared]);

  useEffect(() => {
    if (bringNewCard) {
      setIsDisappeared(true);
      setTimeout(() => {
        setIsDisappeared(false);
        setIsFlipped(false);
      }, 500);
    }
  }, [bringNewCard]);

  return (
    <div
      className={`w-[20rem] h-[160px] p-[2rem] pt-[4rem] mt-[4rem] transition-transform duration-[0.8s] transform-style-3d perspective-1000 box-content relative animate-once animate-jump-in  ${cardClass}`}
      role="card"
      aria-label="flip-card"
      onClick={handleCardClick}
      onKeyDown={onKeyDown}
    >
      <div
        className={`card-inner absolute w-full  h-full text-center transition-transform duration-[0.8s] transform-style-3d top-0 left-0 ${
          isFlipped ? "rotate-y-0" : "-rotate-y-180"
        }`}
      >
        <div
          className="card-front absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5 bg-orange-400 rounded-xl -rotate-y-180"
          onKeyDown={onFrontContentKeyDown}
        >
          {frontContent}
        </div>
        <div
          className={`card-back absolute top-0 left-0 w-full h-full backface-hidden shadow-[10px_10px_10px_10px_rgba(0,0,0,0.2)] flex justify-center items-center box-border p-5 bg-red-400 rounded-xl `}
          onKeyDown={onBackContentKeyDown}
        >
          <FaArrowLeft
            className="card-arrow-left cursor-pointer absolute top-4 left-5 z-10"
            onClick={backFlipCard}
            aria-label="flip-back"
            role="button"
          />
          {backContent}
          {showRedo && (
            <CgRedo
              className="absolute bottom-3 right-3 rotate-x-45 w-5 h-5 animate-jump-in-and-rotate-y--180  cursor-pointer"
              onClick={handleClickRedo}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default FlipCard;
