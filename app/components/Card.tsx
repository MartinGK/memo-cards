type Props = { children: React.ReactElement };

import { styled } from "styled-components";

const CardStyled = styled.div`
  padding: 2rem;
  background-color: orange;
  min-width: 1rem;
  max-width: 20rem;
  min-height: 10rem;
  border-radius: 0.35rem;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

export default function Card({ children }: Props) {
  return (
    <CardStyled role="card" aria-label="card">
      {children}
    </CardStyled>
  );
}
