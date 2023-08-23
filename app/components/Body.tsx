"use client";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const StyledBody = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: -moz-linear-gradient(top, #FFB42D 0%, #FFCB6D 50%, #FFF 100%);
  background: -webkit-linear-gradient(top, #FFB42D 0%, #FFCB6D 50%, #FFF 100%);
  background: linear-gradient(to bottom, #FFB42D 0%, #FFCB6D 50%, #FFF 100%) !important;
  width: 100vw;
  height: 100vh;
  margin: 0px;
`;

export default function Body({ children }: Props) {
  return <StyledBody>{children}</StyledBody>;
}
