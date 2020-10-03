import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Summary from "../Summary";
import QuestionContext from '../../contexts/QuestionContext'

const renderWithContext = (value) => {
  return render(
    <QuestionContext.Provider value={value}>
      <Summary />
    </QuestionContext.Provider>
  );
}

let contextValue;

beforeEach(() => {
  contextValue = {
    state: {
      correctAnswers: 0,
      incorrectAnswers: 0,
      questionsAnswered: 0,
      finalScorePercentage: 0,
    },
    dispatch: jest.fn()
  }
})



describe("Summary", () => {
  test("it should render", () => {
    const { container } = renderWithContext(contextValue);

    expect(container).toMatchSnapshot();
  });

  test('it should dispatch an action to restart the quiz', async () => {
    const { getByTestId } = renderWithContext(contextValue);
    const restartBtn = getByTestId('restart-btn');

    fireEvent.click(restartBtn)

    expect(contextValue.dispatch).toHaveBeenCalled();
  });

  test('it should contain a summary of the previous quiz', () => {
    contextValue.state = {
      correctAnswers: 2,
      incorrectAnswers: 3,
      questionsAnswered: 5,
      finalScorePercentage: 40,
    }

    const { container, getByTestId } = renderWithContext(contextValue);
    const correctAnswers = getByTestId('correct-answers');
    const incorrectAnswers = getByTestId('incorrect-answers');
    const questionsAnswered = getByTestId('questions-answered');
    const fsPercentage = getByTestId('final-score-percentage');


    expect()
  });


});