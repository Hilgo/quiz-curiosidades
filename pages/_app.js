import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  // document.title = 'Quiz Curiosidades - Imersão Alura - Lucas Palma Stabile'
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Head>
        <title>Quiz Curiosidades - Lucas Palma Stabile - Imersão React Alura</title>
        {/* Primary Meta Tags */}
        <title>Quiz Curiosidades - Lucas Palma Stabile</title>
        <meta name="title" content="Quiz Curiosidades - Lucas Palma Stabile" />
        <meta name="description" content="Quiz sobre curiosidades feito em React" />

        {/*  Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Quiz Curiosidades - Lucas Palma Stabile" />
        <meta property="og:description" content="Quiz sobre curiosidades feito em React" />
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png/" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Quiz Curiosidades - Lucas Palma Stabile" />
        <meta property="twitter:description" content="Quiz sobre curiosidades feito em React" />
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* Component muda para cada página que temos */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
