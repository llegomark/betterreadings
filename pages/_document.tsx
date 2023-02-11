import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Revolutionize your students' reading experience with BetterReading. Our AI-generated reading passages are tailored to each student's grade level and designed to improve skills, comprehension, and confidence. Start today!"
          />
          <meta
            property="og:site_name"
            content="Personalized Reading Passages for Improved Student Learning - Better Reading"
          />
          <meta
            property="og:description"
            content="Revolutionize your students' reading experience with BetterReading. Our AI-generated reading passages are tailored to each student's grade level and designed to improve skills, comprehension, and confidence. Start today!"
          />
          <meta
            property="og:title"
            content="Personalized Reading Passages for Improved Student Learning - Better Reading"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Personalized Reading Passages for Improved Student Learning - Better Reading"
          />
          <meta
            name="twitter:description"
            content="Revolutionize your students' reading experience with BetterReading. Our AI-generated reading passages are tailored to each student's grade level and designed to improve skills, comprehension, and confidence. Start today!"
          />
          <meta
            property="og:image"
            content="https://reading.llego.dev/betterreading.png"
          />
          <meta
            name="twitter:image"
            content="https://reading.llego.dev/betterreading.png"
          />
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