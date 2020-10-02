import * as React from "react";
import { useEffect, useReducer } from "react";
import { Container } from 'semantic-ui-react'
import { configureAnswers, evaluateAnswers, shuffle } from "../../utils/questionUtils";
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

// review types that have "any"
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
  idx: 45,
  answers: [],
  currentAnswer: "",
  correctAnswers: 0,
  incorrectAnswers: 0,
  questionsAnswered: 0,
  finalScorePercentage: 0,
  isSummaryVisible: false,
  isWarningMessageVisible: false,
};

const reducer = (state: any, action: any) => {
  // TODO: add type,payload destructuring here

  switch (action.type) {
    case "SET_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "ONCHANGE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "NEXT_QUESTION": {
      return {
        ...state,
        ...action.payload,
        currentAnswer: "",
      };
    }
    case "RESTART_QUIZ": {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const { currentAnswer } = state;

  const handleChange = (e: any, { value }: any) => {
    e.preventDefault();
    const payload = {
      currentAnswer: value,
    };

    return dispatch({ type: "ONCHANGE", payload });
  };

  const updateQuestion = (e: any) => {
    e.preventDefault();

    let nextIdx = state.idx + 1;
    let nextQuestion: any = state.questions[nextIdx];

    if (nextQuestion === undefined || nextIdx >= state.questions.length) {
      nextIdx = 0;
      nextQuestion = state.questions[0];
    }

    const questionsAnswered = state.questionsAnswered + 1;
    const evaluationPayload = evaluateAnswers(state);

    const payload: any = {
      idx: nextIdx,
      currentQuestion: nextQuestion,
      questionsAnswered,
      ...evaluationPayload,
    };
    // Try and remove this conditional
    payload.answers = configureAnswers(nextQuestion);

    // if totalAnswered questions equals 5, or 50 if going through the entire list, show the summary page
    if (questionsAnswered === 5 || questionsAnswered === 50) {
      payload.isSummaryVisible = true;
    }

    return dispatch({ type: "NEXT_QUESTION", payload });
  };


  useEffect(() => {
    // TODO: move this to utils file and make a
    fetch("http://localhost:4000/api/questions")
      .then((res) => res.json())
      .then(({ results }: any) => {
        const questions = results;
        // TODO: change this back and add shuffle method to randomize question order
        const currentQuestion = questions[45];
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
        <Container>
          {state.questions && state.questions.length < 1 ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            >
              Loading...
            </div>
          ) : (
            <div>
              <QuestionForm
                state={state}
                updateQuestion={updateQuestion}
              />
            </div>
          )}
        </Container>
      </QuestionContext.Provider>
    </>
  );
};