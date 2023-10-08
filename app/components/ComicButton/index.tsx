import React from "react";

type Props = { onClick?: () => void; children: React.ReactNode };

export default function ComicButton({ onClick, children, ...rest }: Props) {
  return (
    <button
      className="block px-[10px] py-[20px] text-[24px] font-bold text-center no-underline text-white bg-[#ff5252] border border-solid border-black rounded-[10px] shadow-[5px_5px_0px_#000] transition-all duration-[0.3s] ease-in hover:bg-white hover:text-[#ff5252] hover:border-[#ff5252] hover:shadow-[5px_5px_0px_#ff5252]  active:shadow-none active:translate-y-1"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
