import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import Header from "./components/Header";
import Body from "./components/Body";
import Main from "./components/Main";
import StyledComponentsRegistry from "./lib/registry";
import BodyWithBackground from "./components/BodyWithBackground";

// const inter = Inter({ subsets: ['latin'] })

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
      <StyledComponentsRegistry>
        <Main>
          <BodyWithBackground>
            <Header />
            {children}
          </BodyWithBackground>
        </Main>
      </StyledComponentsRegistry>
    </html>
  );
}
