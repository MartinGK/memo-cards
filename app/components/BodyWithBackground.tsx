"use client";
import * as React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { styled } from "styled-components";
import Body from "./Body";

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

const Background = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  inset: 0;
  opacity: 0.3;
`;

const Squares = styled(animated.div)`
  & {
    position: absolute;
    opacity: 0.5;
    display: grid;
    height: 30vw;
    width: 30vw;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }

  & > div {
    border-radius: 8px;
    overflow: hidden;
  }

  & > div:first-child,
  & > div:nth-child(2) {
    grid-column: 1 / 6;
    grid-row: 4 / 9;
    position: relative;
    z-index: 0;
    background: rgb(255, 255, 255);
  }

  & > div:nth-child(2) {
    z-index: 1;
    opacity: 0.7;
  }

  & > div:last-child {
    grid-column: 4 / 9;
    grid-row: 1 / 6;
    position: relative;
    z-index: 0;
  }
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

const Block = styled(animated.div)``;

export default function BodyWithBackground({ children }: Props) {
  const [{ background }] = useSpring(
    () => ({
      from: { background: step0 },
      to: [
        { background: step0 },
        { background: step1 },
        { background: step2 },
        { background: step3 },
        { background: step4 },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  );

  return (
    <Container>
      <Squares>
        <Block />
        <Block />
        <Block style={{ background }} />
      </Squares>
      <Section>{children}</Section>
      <Background style={{ background }} />
    </Container>
  );
}
