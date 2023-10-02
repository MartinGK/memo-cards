import CardWordsToRelate from "../components/CardRelationToLearn";
import NothingMoreToLearn from "../components/NothingMoreToLearnMessage";
import Section from "../layouts/SectionLayout";

export default function Learn() {
  return (
    <Section>
      <CardWordsToRelate />
      <NothingMoreToLearn />
    </Section>
  );
}
