import * as React from "react";
import { useEffect, useReducer } from "react";
import { Container, Menu, MenuItem } from 'semantic-ui-react'
import { configureAnswers, handleQuestionChange, shuffle } from "../../utils/questionUtils";
import QuestionForm from "./QuestionForm";
import QuestionContext from "../contexts/QuestionContext";
import mainReducer from '../reducers/index'

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IState {
  questions: Question[];
  currentQuestion: Question | any;
  idx: number;
  answers: [] | any;
  currentAnswer: string | any;
  correctAnswers: number;
  incorrectAnswers: number;
  questionsAnswered: number;
  finalScorePercentage: number;
  isSummaryVisible: boolean;
  isWarningMessageVisible: boolean;
}

const initialState: IState = {
  questions: [],
  currentQuestion: {},
  idx: 0,
  answers: [],
  currentAnswer: "",
  correctAnswers: 0,
  incorrectAnswers: 0,
  questionsAnswered: 0,
  finalScorePercentage: 0,
  isSummaryVisible: false,
  isWarningMessageVisible: false,
};


export const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const { currentAnswer } = state;

  const handleChange = (_e: any, { value }: any) => {
    const payload = {
      currentAnswer: value,
    };

    return dispatch({ type: "ONCHANGE", payload });
  };

  const updateQuestion = (e: any) => handleQuestionChange(e, state, dispatch)


  useEffect(() => {
    fetch("http://localhost:4000/api/questions")
      .then((res) => res.json())
      .then(({ results }: any) => {
        const questions = shuffle(results);
        const currentQuestion = questions[0];
        const payload: any = {
          answers: configureAnswers(currentQuestion),
          questions,
          currentQuestion,
        };

        return dispatch({ type: "SET_DATA", payload });
      })
      .catch((error) => console.error("Unable to retrieve data, please try again", error))
  }, []);

  return (
    <>
      <QuestionContext.Provider value={{ state, currentAnswer, handleChange, dispatch }}>
        <Menu fixed='top' inverted>
          <MenuItem as='a' header>
            QUIZR
          </MenuItem>
        </Menu>
        <Container style={{ marginTop: '4em' }}>
          {state.questions && state.questions.length < 1 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center",}}>
              Loading...
            </div>
          ) : (
            <div>
              <QuestionForm state={state} updateQuestion={updateQuestion} />
            </div>
          )}
        </Container>
      </QuestionContext.Provider>
    </>
  );
};
