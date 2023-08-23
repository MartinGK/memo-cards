"use client";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default function Main({ children }: Props) {
  return <StyledMain>{children}</StyledMain>;
}
