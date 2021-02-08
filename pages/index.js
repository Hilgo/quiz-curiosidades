import React from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

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
              <form onSubmit={(event) => {
                event.preventDefault();

                router.push(`/quiz?nome=${nome}`);
              // router manda para próxima página
              }}
              >
                <Input
                  onChange={(evento) => {
                  // Nome
                    setarNome(evento.target.value);
                  }}
                  placeholder="Diga seu nome para começar a jogar"
                  name="Nome do usuário"
                  value={nome}
                />
                <Button type="submit" disabled={nome.length === 0}>
                  {`Jogar ${nome}`}
                </Button>
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
