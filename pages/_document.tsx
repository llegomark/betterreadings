import Document, { Head, Html, Main, NextScript } from "next/document";

const SITE_NAME =
  "Personalized Reading Passages for Improved Student Learning - Better Reading";
const DESCRIPTION =
  "Revolutionize your students' reading experience with BetterReading. Our AI-generated reading passages are tailored to each student's grade level and designed to improve skills, comprehension, and confidence. Start today!";
const IMAGE_URL = "https://reading.llego.dev/betterreading.png";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:title" content={SITE_NAME} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={SITE_NAME} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta property="og:image" content={IMAGE_URL} />
          <meta name="twitter:image" content={IMAGE_URL} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
