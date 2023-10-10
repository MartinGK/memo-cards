"use client";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../contexts/RootStoreContext";
import CardWordsToRelate from "../components/CardRelationToLearn";
import NothingMoreToLearn from "../components/NothingMoreToLearnMessage";
import { Suspense } from "react";

const Layout = observer(() => {
  const { cardHolder } = useRootStore();
  const cardsToLearn = cardHolder.cardsToLearn
  return (
    <Suspense fallback={"Loading..."}>
      {cardsToLearn.length ? <CardWordsToRelate /> : <NothingMoreToLearn /> }
    </Suspense>
  );
});

export default Layout;
