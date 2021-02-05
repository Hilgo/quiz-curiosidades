import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';

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
  const router = useRouter();
  const [nome, setarNome] = React.useState('');

  return (
    <>
      <QuizBackground alt="Imagem de fundo cheio de pontos de interrogação" backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Curiosidades</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={function EnvioFormulario(event) {
                event.preventDefault();

                router.push(`/quiz?nome=${nome}`);
              // router manda para próxima página
              }}
              >
                <input
                  onChange={function AlterarNome(evento) {
                  // Nome
                    setarNome(evento.target.value);
                  }}
                  placeholder="Diga seu nome para começar a jogar"
                />
                <button type="submit" disabled={nome.length === 0}>
                  Jogar
                  {' '}
                  {nome}
                </button>
              </form>
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
        <GitHubCorner projectUrl="https://github.com/Hilgo/quiz-curiosidades" />
      </QuizBackground>
    </>
  );
}
