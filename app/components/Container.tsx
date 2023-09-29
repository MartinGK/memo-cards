"use client";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

type Props = {
    children: React.ReactNode
}

export default function Container({children, ...rest }: Props) {
  return (
    <StyledContainer role="container"  {...rest} >
        {children}
    </StyledContainer>
  );
}