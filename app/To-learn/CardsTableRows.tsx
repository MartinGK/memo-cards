"use client";
import format from "date-fns/format";
import { useRootStore } from "../contexts/RootStoreContext";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { TD, TR, TBody } from "../components/Table";

const CardsTableRows = observer(() => {
  const { cardHolder } = useRootStore();

  useEffect(() => {
    if (!cardHolder.cards.length) {
      cardHolder.fetchCards();
    }
  }, []);
  return (
    <TBody>
      {cardHolder.cards.map((card, index) => (
        <TR key={card.id} className="border-b dark:border-neutral-500">
          <TD className="font-medium">{index + 1}</TD>
          <TD>{format(new Date(card.createdAt), "d LLL, Y")}</TD>
          <TD>{card.wordsToRelate}</TD>
          <TD>{card.relationToRelate}</TD>
          <TD className="flex justify-center">
            {card.learned ? (
              <BsCheckCircleFill className="text-green-600" />
            ) : (
              <ImCross className="text-red-600" />
            )}
          </TD>
        </TR>
      ))}
    </TBody>
  );
});

export default CardsTableRows;
