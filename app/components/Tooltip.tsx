'use client'
import { Popup } from "reactjs-popup";

type Props = {
  message: string;
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined;
  isOpen: boolean;
};

// `
//   position: absolute;
//   &-content {
//     -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
//   }
//   &-content-disappear {
//     -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
//   }
// `;

// react-popup only support animation on open, not on close
// https://react-popup.elazizi.com/react-popup-animation
export default function Tooltip({ message, trigger, isOpen }: Props) {
  return (
    <Popup
      className="absolute"
      trigger={trigger}
      position="right center"
      closeOnDocumentClick
      open={isOpen}
    >
        <span
          aria-label="tooltip"
          role="tooltip"
          className="subpixel-antialiased box-border m-auto bf-white p-[0.5rem] rounded-[5px] w-[200px] bg-[#292d3e] border-[1px] border-solid border-[#464545] text-white z-50 pointer-events-auto text-center top-[-12rem] left-[-6rem] absolute animate-anvil"
        >
          {message}
        </span>
    </Popup>
  );
}
