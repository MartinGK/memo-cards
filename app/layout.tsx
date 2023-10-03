import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import BodyWithBackground from "./components/BodyWithBackground";
import Section from "./layouts/Section";
import RootStore from "./Providers/RootStore";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memo Cards",
  description: "Learn new concepts with cards!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <RootStore>
        <BodyWithBackground>
          <Header />
          <Section>{children}</Section>
        </BodyWithBackground>
      </RootStore>
    </html>
  );
}
