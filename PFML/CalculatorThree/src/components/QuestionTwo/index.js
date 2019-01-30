import React from 'react';
import { InputCurrency } from '@massds/mayflower-react';
import QuestionTwoProps from '../../data/QuestionTwo.json'
import './index.css';

const QuestionTwo = (props) => {
	const { question, errorMsg } = QuestionTwoProps;
	return (
    <InputCurrency 
      labelText={question}
      id="question-2"
      name="question-2"
      defaultValue={props.defaultValue}
      min={0}
      format={{
        "mantissa": 2,
        "trimMantissa": false,
        "thousandSeparated": true,
        "negative": "parenthesis",
        "output": "currency"
  		}}
  		errorMsg={errorMsg}
  		onChange={props.onChange}
      required={true}
      disabled={props.disabled}
      inline={true}
      step={1}
  	/>
  );
};

export default QuestionTwo;
