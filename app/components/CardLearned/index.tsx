import { useRootStore } from "@/app/contexts/RootStoreContext";
import { Card } from "@/app/store/Card";
import { observer } from "mobx-react-lite";
import FlipCard from "../FlipCard";
import { CgRedo } from "react-icons/cg";

type Props = {
  card: Card;
};

const CardLearned = observer(({ card }: Props) => {
  const { cardHolder } = useRootStore();

  const markAsUnlearned = () => {
    card.learned = false;
    cardHolder.saveCard(card);
  };

  return (
      <FlipCard
        frontContent={card.wordsToRelate}
        backContent={card.relationToRelate}
        flipOnClick
        showRedo
        onClickRedo={markAsUnlearned}
      />
  );
});

export default CardLearned;
