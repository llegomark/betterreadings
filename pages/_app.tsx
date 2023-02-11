import type { AppProps } from "next/app";
import "../styles/globals.css";
import localFont from '@next/font/local'

const inter = localFont({ 
  src: '../styles/Inter-Light.ttf',
  weight: "300",
  style: "normal",
  display: "swap",
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
