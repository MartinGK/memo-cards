"use client";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  height: 100%;
  width: 100%;
`;

export default function Section({ children }: { children: React.ReactNode }) {
  return <StyledSection>{children}</StyledSection>;
}
