"use client";
import format from "date-fns/format";
import { useRootStore } from "../contexts/RootStoreContext";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsTrashFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { TD, TR, TBody } from "../components/Table";
import { TCard } from "../store/Card";

const CardsTableRows = observer(() => {
  const [cards,setCards] = useState<TCard[]>([]);
  const { cardHolder } = useRootStore();

  const deleteCard = (id: string) => {
    cardHolder.deleteCardById(id)
  }

  useEffect(() => {
    if (!cardHolder.cards.length) {
      cardHolder.fetchCards();
    }
  }, []);

  useEffect(() => {
    if (cardHolder.cards.length) {
      setCards(cardHolder.cards);
    }
  }, [cardHolder.cards]);

  return (
    <TBody>
      {cards.map((card, index) => (
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
          <TD>
            <BsTrashFill className="text-gray-600 cursor-pointer" onClick={()=>deleteCard(card.id)}/>
          </TD>
        </TR>
      ))}
    </TBody>
  );
});

export default CardsTableRows;
