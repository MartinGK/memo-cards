"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  children: React.ReactNode;
};
const getNextBgStep = (background: string) => {
  if (bgSteps.indexOf(background) === bgSteps.length) return bgSteps[0];
  return bgSteps[bgSteps.indexOf(background) + 1];
};

const bgSteps = ["#ff615d", "#bad5ea", "#fd8769", "#356d94", "#ffdcb3"];

export default function BodyWithBackground({ children }: Props) {
  const [background, setBackground] = useState(bgSteps[0]);
  const debouncedValue = useDebounce(background, 10000);

  useEffect(() => {
    setBackground(getNextBgStep(background));
  }, [debouncedValue]);

  return (
    <body
      className="
      flex flex-col items-center w-screen h-screen justify-center relative m-0"
    >
      <section className="w-full h-full flex z-10 flex-col items-center justify-center overflow-scroll">
        {children}
      </section>
      <div
        className="absolute w-full h-full z-0 inset-0 opacity-30 transition-all duration-[10s]"
        style={{ background }}
      />
    </body>
  );
}
