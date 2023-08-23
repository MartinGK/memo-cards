import { Popup } from "reactjs-popup";
import styled from "styled-components";

type Props = {
  message: string;
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined;
  isOpen: boolean;
};

const StyledMessage = styled.span`
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;
  word-wrap: break-word;
  box-sizing: border-box;
  background: #fff;
  margin: auto;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  width: 200px;
  background-color: #292d3e;
  border: 1px solid #464545;
  color: #fff;
  z-index: 999;
  pointer-events: auto;
  text-align-last: center;
  top: -12rem;
  left: -6rem;
  position: absolute;
`;

const StyledPopup = styled(Popup)`
  @keyframes anvil {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    1% {
      transform: scale(0.96) translateY(10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }
  position: absolute;
  &-content {
    -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
  &-content-disappear {
    -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

// react-popup only support animation on open, not on close
// https://react-popup.elazizi.com/react-popup-animation
export default function Tooltip({ message, trigger, isOpen }: Props) {
  return (
    <StyledPopup
      trigger={trigger}
      position="right center"
      closeOnDocumentClick
      open={isOpen}
    >
      <StyledMessage aria-label="tooltip" role="tooltip">
        {message}
      </StyledMessage>
    </StyledPopup>
  );
}