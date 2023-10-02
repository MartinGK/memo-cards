"use client";
import * as React from "react";
import { styled } from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Container = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: relative;
  margin: 0px;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  inset: 0;
  opacity: 0.3;
`;

const Section = styled.section`
  z-index: 9;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const step0 = "#ff615d";
const step1 = "#bad5ea";
const step2 = "#fd8769";
const step3 = "#356d94";
const step4 = "#ffdcb3";


export default function BodyWithBackground({ children }: Props) {
  return (
    <Container>
      <Section>{children}</Section>
      <Background />
    </Container>
  );
}
