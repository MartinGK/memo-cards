"use client";
import * as React from "react";
import { useSpring, animated, config } from "@react-spring/web";

type Props = {
  children: React.ReactNode;
};

const step0 = "#ff615d";
const step1 = "#bad5ea";
const step2 = "#fd8769";
const step3 = "#356d94";
const step4 = "#ffdcb3";

export default function BodyWithBackground({ children }: Props) {
  const [{ background }] = useSpring(
    () => ({
      from: { background: step0 },
      to: [
        { background: step0 },
        // { background: step0 },
        // { background: step1 },
        // { background: step1 },
        // { background: step2 },
        // { background: step2 },
        // { background: step3 },
        // { background: step3 },
        // { background: step4 },
        // { background: step4 },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  );

  return (
    <body
      className="
      flex flex-col items-center w-screen h-screen justify-center relative m-0"
    >
      <section className="w-full h-full flex z-10 flex-col items-center justify-center">
        {children}
      </section>
      <animated.div
        className="absolute w-full h-full z-0 inset-0 opacity-30"
        style={{ background }}
      />
    </body>
  );
}
