import React from 'react'
import PropTypes from 'prop-types'
import { Container, Button, Form } from 'semantic-ui-react'
import TrueFalse from './TrueFalse'
import MultipleChoice from './MultipleChoice'
import ShortAnswer from './ShortAnswer'
import SummaryPage from './Summary'
import { unescapeStr } from '../../utils/questionUtils'


const QuestionForm = ({ updateQuestion, state }: any) => {
  const { currentAnswer, currentQuestion, isSummaryVisible } = state;
  const { type } = currentQuestion;
  const question = unescapeStr(currentQuestion.question);
  const isDisabled = currentAnswer.length < 1;
  const QUESTION_TYPES: any = {
    boolean: <TrueFalse />,
    multiple: <MultipleChoice />,
    text: <ShortAnswer />,
  };


  return (
    <>
      {isSummaryVisible
        ? <SummaryPage />
        : <Container textAlign="left">
            <Form onSubmit={updateQuestion}>
              <h3>{question}</h3>
              <div style={{ marginBottom: '10px' }}>
              {QUESTION_TYPES[type]}
              </div>
              <Button type="submit" primary disabled={isDisabled}>Next</Button>
            </Form>
          </Container>
      }
    </>
  )
}

QuestionForm.propTypes = {
  isSummaryVisible: PropTypes.bool,
  answers: PropTypes.array,
  currentQuestion: PropTypes.object,
  updateQuestion: PropTypes.func,
  state: PropTypes.object
}

export default QuestionForm
