import { AppProps } from "next/app";

function MemoCardsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MemoCardsApp;
