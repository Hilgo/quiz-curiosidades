import React from 'react';
import PropTypes from 'prop-types';
import db from '../db.json';
import Widget from '../src/components/Widget';
// import Footer from '../src/components/Footer';
// import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
// import Input from '../src/components/Input';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>[Desafio do loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  pergunta, totalPerguntas, indicePergunta, AoEnviar,
}) {
  const IdPergunta = `pergunta__${indicePergunta}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${indicePergunta + 1} de ${totalPerguntas}`}
        </h3>
      </Widget.Header>
      <img
        alt="descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={pergunta.image}
      />
      <Widget.Content>
        <h2>
          {pergunta.title}
        </h2>
        <p>{pergunta.description}</p>
        <form onSubmit={(evento) => {
          evento.preventDefault();
          AoEnviar();
        }}
        >
          {pergunta.alternatives.map((alternativa, alternativaIndex) => {
            const idAlternativa = `alternativa__${alternativaIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={idAlternativa}
              >
                <input
                  id={idAlternativa}
                  name={IdPergunta}
                  type="radio"
                />
                {alternativa}
              </Widget.Topic>
            );
          })}
          {/* <pre>
          {JSON.stringify(pergunta,null,4)}
        </pre> */}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const estadosDaTela = {
  QUIZ: 'QUIZ',
  CARREGANDO: 'CARREGANDO',
  RESULTADO: 'RESULTADO',
};

export default function PaginaQuiz() {
  const totalPerguntas = db.questions.length;
  const [indicePergunta, atribuirIndicePergunta] = React.useState(0);
  const pergunta = db.questions[indicePergunta];
  const [estadoTela, atribuirEstado] = React.useState(estadosDaTela.CARREGANDO);

  // [No React é chamado de Effects]

  // cresce -> WillUpdate
  // morre -> WilUnmount
  React.useEffect(() => {
    // fetch...
    setTimeout(() => { atribuirEstado(estadosDaTela.QUIZ); }, 1 * 1000);
    // nasce -> didMount
  }, []);

  function TratarPerguntaAtual() {
    const proximaPergunta = indicePergunta + 1;
    if (proximaPergunta < totalPerguntas) {
      atribuirIndicePergunta(proximaPergunta);
    } else {
      atribuirEstado(estadosDaTela.RESULTADO);
    }
  }

  return (
    <QuizBackground alt="Imagem de fundo cheio de pontos de interrogação" backgroundImage={db.bg}>
      <QuizContainer>
        {/* <QuizLogo /> */}
        {estadoTela === estadosDaTela.QUIZ && (
        <QuestionWidget
          pergunta={pergunta}
          totalPerguntas={totalPerguntas}
          indicePergunta={indicePergunta}
          AoEnviar={TratarPerguntaAtual}
        />
        ) }
        {estadoTela === estadosDaTela.CARREGANDO && <LoadingWidget /> }
        {estadoTela === estadosDaTela.RESULTADO && <div>Você acertou X questões, parabéns!</div> }

      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  pergunta: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    answer: PropTypes.number.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  totalPerguntas: PropTypes.number.isRequired,
  indicePergunta: PropTypes.number.isRequired,
  AoEnviar: PropTypes.func.isRequired,
};
