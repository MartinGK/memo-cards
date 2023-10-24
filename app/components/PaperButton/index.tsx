type Props = { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PaperButton({ className, children, ...rest }: Props) {
  return (
    <button
      role="button"
      {...rest}
      className={`self-center bg-[#fff] bg-none bg-[0_90%] [background-size:4px_3px] border-solid border-2 border-[black] [box-shadow:rgba(0,_0,_0,_0.2)_15px_28px_25px_-18px] box-border text-[#41403e] cursor-pointer inline-block font-[Neucha,_sans-serif] text-[1rem] leading-[23px] outline-[none] p-3 no-underline [transition:all_235ms_ease-in-out] rounded-bl-[15px_255px] rounded-br-[225px_15px] rounded-tl-[255px_15px] rounded-tr-[15px_225px] select-none hover:[box-shadow:rgba(0,_0,_0,_0.3)_2px_8px_8px_-5px] hover:[transform:translate3d(0,_2px,_0)] focus:[box-shadow:rgba(0,_0,_0,_0.3)_2px_8px_4px_-6px] disabled:bg-gray-300 hover:disabled:transform-none hover:disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}
