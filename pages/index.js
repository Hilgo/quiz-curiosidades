import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import Head from 'next/head'

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz Curiosidades - Lucas Palma Stabile</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QuizBackground alt='Imagem de fundo cheio de pontos de interrogação' backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Título1</h1>
            </Widget.Header>
            <Widget.Content>
              <p>parágrafo1</p>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Título2</h1>
            </Widget.Header>
            <Widget.Content>
              <p>parágrafo2</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl='https://github.com/Hilgo/quiz-curiosidades' />
      </QuizBackground>
    </>
  )
}
