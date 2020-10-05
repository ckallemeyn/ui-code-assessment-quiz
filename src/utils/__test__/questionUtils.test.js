import { handleQuestionChange, evaluateAnswers, shuffle, unescapeStr, configureAnswers, calculatePercentage } from '../questionUtils'
import { questionData } from '../../data/questionData'

describe('Utility Methods', () => {

  describe('shuffle', () => {
    test('it should shuffle an array', () => {
      const nums = [5, 3, 2, 4, 8, 7, 0, 10, 11, 12];
      const shuffledNums = shuffle(nums);
      const secondNum = nums[1];

      expect(shuffledNums.indexOf(secondNum) !== 1).toBeTruthy;
    });
  })

  describe('configureAnswers', () => {
    test('it should return undefined if given a short answer question', () => {
      const question = { type: 'text' };
      const invalidOption = configureAnswers(question);

      expect(invalidOption).toBeUndefined;
    });
  })

  describe('calculatePerctange', () => {
    test('it should return 0 if given 0 as the dividend', () => {
      const zero = calculatePercentage(0, 5);

      expect(zero).toBe(0);
    });

    test('it should calucate and round up the quotient', () => {
      const quotient = calculatePercentage(2, 5);

      expect(quotient).toBe(40);
    })
  });

  describe('evaluteAnswers', () => {
    test('it should return undefined if given an empty state object', () => {
      const state = null;
      const invalidState = evaluateAnswers(state);

      expect(invalidState).toBeUndefined;
    });

    test('it should update the total of correct answers no matter the case of the input', () => {
      const state = {
        currentQuestion: {
          correct_answer: 'Black'
        },
        currentAnswer: 'black',
        correctAnswers: 1,
        incorrectAnswers: 2,
        questionsAnswered: 3,
      };
      const updatedState = evaluateAnswers(state);

      expect(updatedState).toHaveProperty('finalScorePercentage');
      expect(updatedState.correctAnswers).toBe(2);
      expect(updatedState.finalScorePercentage).toBe(50);
    });
    test('it should update the total of incorrect answers if given a wrong answer', () => {
      const state = {
        currentQuestion: {
          correct_answer: 'Blue'
        },
        currentAnswer: 'green',
        correctAnswers: 1,
        incorrectAnswers: 2,
        questionsAnswered: 3,
      };
      const updatedState = evaluateAnswers(state);

      expect(updatedState).toHaveProperty('finalScorePercentage');
      expect(updatedState.correctAnswers).toBe(1);
      expect(updatedState.incorrectAnswers).toBe(3);
      expect(updatedState.finalScorePercentage).toBe(25);
    });
  });

  describe('handleQuestionChange', () => {
    test('it should dispatch an action', () => {
      const e = {
        preventDefault: jest.fn()
      }
      const dispatch = jest.fn();
      const state = {
        idx: 2,
        questions: questionData,
        currentQuestion: {
          correct_answer: 'Black'
        },
        currentAnswer: 'black',
        correctAnswers: 1,
        incorrectAnswers: 2,
        questionsAnswered: 3,
      };

      const formSubmission = handleQuestionChange(e, state, dispatch);

      expect(dispatch).toHaveBeenCalled();
    });

    test('it should go to the beginning of the questions list if currently on the last question', () => {
      const e = {
        preventDefault: jest.fn()
      }
      const dispatch = jest.fn();
      const state = {
        idx: 5,
        questions: questionData,
        currentQuestion: {
          correct_answer: 'Black'
        },
        currentAnswer: 'black',
        correctAnswers: 1,
        incorrectAnswers: 2,
        questionsAnswered: 3,
      };

      const formSubmission = handleQuestionChange(e, state, dispatch);

      expect(dispatch).toHaveBeenCalled();
    });

    test('it should go to the beginning of the questions list if currently on the last question', () => {
      console.log('what is question data lenght', questionData.length)
      const e = {
        preventDefault: jest.fn()
      }
      const dispatch = jest.fn();
      const state = {
        idx: 3,
        questions: questionData,
        currentQuestion: {
          correct_answer: 'Black'
        },
        currentAnswer: 'black',
        correctAnswers: 1,
        incorrectAnswers: 2,
        questionsAnswered: 4,
      };

      const formSubmission = handleQuestionChange(e, state, dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  })

})
