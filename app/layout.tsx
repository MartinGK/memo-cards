// import './globals.css'
"use client";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import Header from "./components/Header";
import Body from "./components/Body";
import Main from "./components/Main";
import StyledComponentsRegistry from "./lib/registry";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Memo Cards",
  description: "Learn new concepts!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <Body>
          <Header />
          <Main>{children}</Main>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
