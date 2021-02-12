import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  // {/* <pre style={{ color: 'black' }}>
  //   {JSON.stringify(dbExterno.questions, null, 4)}
  // </pre> */}
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em obter os dados');
      }).then((respostaConvertidaEmObjeto) => (respostaConvertidaEmObjeto))
      .catch((erro) => {
      // eslint-disable-next-line no-console
        console.log(erro);
      });
    // console.log('dbExterno', dbExterno);
    // console.log('Infos que o Next nos oferece', context.query.id);
    return {
      props: {
        dbExterno,
      },
    };
  } catch (erro) {
    // redirect
    throw new Error(erro);
  }
}

QuizDaGalera.propTypes = {
  dbExterno: PropTypes.shape({
    questions: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      answer: PropTypes.number.isRequired,
      alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    bg: PropTypes.string.isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        mainBg: PropTypes.string.isRequired,
        contrastText: PropTypes.string.isRequired,
        wrong: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
      }),
      borderRadius: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
