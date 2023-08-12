"use client";
import Navigator from "../components/Navigator";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Header() {
  return (
    <StyledHeader role="StyledHeader" aria-label="header">
      <h1>Welcome!</h1>
      <Navigator />
    </StyledHeader>
  );
}
