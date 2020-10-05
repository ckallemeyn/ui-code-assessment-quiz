import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { screen, waitFor } from '@testing-library/dom'
import userEvent from "@testing-library/user-event"
import ShortAnswer from "../ShortAnswer"
import QuestionContext from '../../contexts/QuestionContext'

const renderWithContext = (value) => {

  return render(
    <QuestionContext.Provider value={value}>
      <ShortAnswer />
    </QuestionContext.Provider>
  )
}

const contextValue = {
  currentAnswer: '',
  handleChange: jest.fn()
}


describe("Short Answer", () => {
  test("it should render", () => {
    const { container } = renderWithContext(contextValue);

    expect(container).toMatchSnapshot();
  });

  test('it should invoke handleChange if a user types into the input', async () => {
    const { container } = renderWithContext(contextValue);
    const input = container.querySelector('[data-testid="short-answer"] input');

    await userEvent.type(input, 'blue')

    expect(contextValue.handleChange).toHaveBeenCalled();
  });

});

