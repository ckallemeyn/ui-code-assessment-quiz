import React from "react";
import { render, act, waitFor, screen, fireEvent } from "@testing-library/react";
import { App } from "../App";
import { questionData } from '../../../data/questionData'
import QuestionContext from '../../contexts/QuestionContext'

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      results: questionData
    })
  }));
})

const renderWithContext = (value) => {
  return render(
    <QuestionContext.Provider value={value}>
      <App />
    </QuestionContext.Provider>
  );
}

let contextValue = {
  state: {
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
  },
  dispatch: jest.fn(),
  handleChange: jest.fn(),
  currentAnswer: '',
}



describe('Main App Component', () => {

  test('it should render with a loading state', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });


  test('it should initially render in a loading state', async () => {
    await act(async () => render(<App />))

    await waitFor(() => {
      expect(screen.getByTestId('question-form')).toBeInTheDocument;
    });
  });

  test('it should invoke handle change when a user selects an answer', async () => {
    await act(async () => renderWithContext(contextValue))

    await waitFor(() => {
      const radioBtnGroup = screen.getAllByTestId('radio-btn');
      const firstRadioBtn = radioBtnGroup[0].children[0];
      fireEvent.click(firstRadioBtn)
      expect(firstRadioBtn.checked).toBe(true)
    })
  });

  test('it should show the next button as active once a user has selected an answer', async () => {
    await act(async () => renderWithContext(contextValue))

    await waitFor(() => {
      const radioBtnGroup = screen.getAllByTestId('radio-btn');
      const nextBtn = screen.getByTestId('next-btn');
      const firstRadioBtn = radioBtnGroup[0].children[0];
      expect(nextBtn.getAttribute('disabled')).toBeFalsy;

      fireEvent.click(firstRadioBtn)
      expect(firstRadioBtn.checked).toBe(true)
      expect(nextBtn.getAttribute('disabled')).toBe(null);
    })
  });


})
