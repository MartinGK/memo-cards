'use client'
import CardAddNewRelation from "../components/CardAddNewRelation";
import Layout from "../layout";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  `

export default function Add() {
  return (
    <Layout>
      <StyledContainer role="container" aria-label="add-container">
        <CardAddNewRelation />
      </StyledContainer>
    </Layout>
  );
}
