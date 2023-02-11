import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: "300",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
