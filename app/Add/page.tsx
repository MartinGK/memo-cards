import CardAddNewRelation from "../components/CardAddNewRelation";
import SectionLayout from "../layouts/SectionLayout";
import Container from '../components/Container';

export default function Add() {
  return (
    <SectionLayout>
      <Container aria-label="add-container">
        <CardAddNewRelation />
      </Container>
    </SectionLayout>
  );
}
