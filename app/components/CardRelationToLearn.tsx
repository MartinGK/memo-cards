import FlipCard from "./FlipCard";

type Props = {};

export default function CardRelationToLearn({}: Props) {
  return (
    <FlipCard
      frontContent={<span>CardRelationToLearn</span>}
      backContent={<span>CardRelationToLearn</span>}
    />
  );
}
