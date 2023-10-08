"use client";
import { observer } from "mobx-react-lite";
import FlipCard from "./FlipCard";
import { useRootStore } from "../contexts/RootStoreContext";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TCard } from "../store/Card";

const CardRelationToLearn = observer(() => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [bringNewCard, setBringNewCard] = useState(false);
  const { cardHolder } = useRootStore();
  const [card, setCard] = useState<TCard | undefined>(
    cardHolder.getRandomCardToLearn()
  );

  const handleClickCross = () => {
    if (card) cardHolder.markCardAsUnlearned(card);
    disappearCardAndBringANewOne();
  };

  const handleClickCheck = () => {
    if (card) cardHolder.markCardAsLearned(card);
    disappearCardAndBringANewOne();
  };

  const disappearCardAndBringANewOne = () => {
    setBringNewCard(true);
  };

  const onCardClick = () => {
    setIsFlipped(true);
  };

  useEffect(() => {
    if (bringNewCard) {
      setCard(cardHolder.getRandomCardToLearn());
    }
  }, [bringNewCard]);

  return (
    <>
      <FlipCard
        flipOnClick
        bringNewCard={bringNewCard}
        onClick={onCardClick}
        frontContent={<span>{card?.wordsToRelate}</span>}
        backContent={<span>{card?.relationToRelate}</span>}
      />
      <div
        className={`flex flex-col mt-10 border p-5 px-10 rounded border-black transition-all ${
          isFlipped ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xl font-bold">Did you remembered it?</span>
        <div className="flex justify-between mt-5">
          <ImCross
            className="text-red-600 text-[3rem] cursor-pointer"
            onClick={handleClickCross}
          />
          <FaCheck
            className="text-green-600 text-[3rem] cursor-pointer"
            onClick={handleClickCheck}
          />
        </div>
      </div>
    </>
  );
});

export default CardRelationToLearn;
