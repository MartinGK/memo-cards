"use client";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../contexts/RootStoreContext";
import CardWordsToRelate from "../components/CardRelationToLearn";
import NothingMoreToLearn from "../components/NothingMoreToLearnMessage";

const Layout = observer(() => {
  const { cardHolder } = useRootStore();
  const cardsToLearn = cardHolder.cardsToLearn
  return (
    <>
      {cardsToLearn.length ? <CardWordsToRelate /> : <NothingMoreToLearn /> }
    </>
  );
});

export default Layout;
