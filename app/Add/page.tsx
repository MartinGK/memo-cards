"use client";
import CardAddNewRelation from "../components/CardAddNewRelation";
import styled from "styled-components";
import Section from "../layouts/sectionLayout";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Add() {
  return (
    <Section>
      <StyledContainer role="container" aria-label="add-container">
        <CardAddNewRelation />
      </StyledContainer>
    </Section>
  );
}
