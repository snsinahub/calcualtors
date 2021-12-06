import React, { Component, Fragment } from 'react';
import moment from 'moment';
import InputCurrency from '@massds/mayflower-react/es/components/forms/InputCurrency';
import InputCheckBox from '@massds/mayflower-react/es/components/forms/InputCheckBox';
import Button from '@massds/mayflower-react/es/components/atoms/buttons/Button';
import Form, { FormProvider } from '@massds/mayflower-react/es/components/forms/Form';
import { FormContext } from '@massds/mayflower-react/es/components/forms/Input/context';
import Output from './output';
import { toCurrency } from '../../utils';
import inputProps from '../../data/wagesInput.json';
import {
  buildQuartersArray, paidQuarters, calcWeeklyPay, calcWeeklyBenefit, calcEligibility
} from '../formula';


import './index.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      applyAll: false,
      values: {
        quarter1: '',
        quarter2: '',
        quarter3: '',
        quarter4: ''
      }
    };

    this.inputCurrencyProps = {
      placeholder: 'e.g. $10,000',
      format: {
        mantissa: 2,
        trimMantissa: false,
        thousandSeparated: true
      },
      inline: true,
      min: 0,
      step: 0.01,
      showButtons: false
    };
  }

  quarterDateRange = ({ date, quartersAgo }) => {
    const format = 'MMM YYYY';
    const quarterCurrent = moment(date).quarter();
    const quarter = quarterCurrent - quartersAgo;
    let qEnd = moment(date).quarter(quarter).endOf('quarter');
    let qStart = moment(date).quarter(quarter).startOf('quarter');
    qEnd = moment(qEnd).format(format);
    qStart = moment(qStart).format(format);
    return{ qEnd, qStart };
  };

  onSubmit = ({
    quarter1, quarter2, quarter3, quarter4
  }) => {
    const quartersArray = buildQuartersArray({
      quarter1, quarter2, quarter3, quarter4
    });
    const { quartersHaveValue, quartersCount } = paidQuarters(quartersArray);

    const weeklyPay = calcWeeklyPay({ quartersHaveValue, quartersCount });

    const {
      vars: {
        maAvgWeek, maxBenefitWeek, lowBenefitFraction, highBenefitFraction, quartersSumThreshhold
      }
    } = this.props;

    const weeklyBenefit = calcWeeklyBenefit({
      weeklyPay, maAvgWeek, maxBenefitWeek, lowBenefitFraction, highBenefitFraction
    });
    const { qualified } = calcEligibility({ weeklyBenefit, quartersHaveValue, quartersSumThreshhold });

    const { onSubmit } = this.props;
    const { submitted } = this.state;

    if (typeof onSubmit === 'function' && submitted) {
      onSubmit({ qualified, weeklyBenefit });
    }
  }

  setValueState = (newValues) => {
    this.setState((state) => ({
      values: {
        ...state.values,
        ...newValues
      }
    }), () => {
      const { values } = this.state;
      this.onSubmit(values);
    });
  };

  render() {
    const {
      applyAll,
      submitted,
      values
    } = this.state;

    const { date, vars } = this.props;

    const { inputLabel, applyAllLabel } = inputProps;

    const q1 = this.quarterDateRange({ date, quartersAgo: 1 });
    const q2 = this.quarterDateRange({ date, quartersAgo: 2 });
    const q3 = this.quarterDateRange({ date, quartersAgo: 3 });
    const q4 = this.quarterDateRange({ date, quartersAgo: 4 });

    return(
      <FormProvider>
        <Form>
          {
          (formContext) => (
            <Fragment>
              <InputCurrency
                {... this.inputCurrencyProps}
                labelText={`${q1.qStart} – ${q1.qEnd} ${inputLabel}`}
                id="quarter1"
                name="quarter1"
                onBlur={(val, { id }) => {
                  // convert val to currency then set it to context
                  const value = toCurrency(val);
                  this.setValueState({ [id]: value });
                  if (applyAll) {
                    formContext.setValue({ id: 'quarter2', value });
                    formContext.setValue({ id: 'quarter3', value });
                    formContext.setValue({ id: 'quarter4', value });
                    this.setValueState({
                      quarter2: value,
                      quarter3: value,
                      quarter4: value
                    });
                  }
                }}
              />
              <InputCheckBox
                id="apply-all"
                value="apply-all"
                label={applyAllLabel}
                icon={{ name: '', ariaHidden: true }}
                onChange={(e, value) => {
                  this.setState({
                    applyAll: value
                  });
                  const { quarter1 } = values;
                  formContext.setValue({ id: 'quarter2', value: quarter1 });
                  formContext.setValue({ id: 'quarter3', value: quarter1 });
                  formContext.setValue({ id: 'quarter4', value: quarter1 });
                  this.setValueState({
                    quarter2: quarter1,
                    quarter3: quarter1,
                    quarter4: quarter1
                  });
                }}
              />
              <InputCurrency
                {... this.inputCurrencyProps}
                labelText={`${q2.qStart} – ${q2.qEnd} ${inputLabel}`}
                id="quarter2"
                name="quarter2"
                disabled={applyAll}
                onBlur={(val, { id }) => {
                  // convert val to currency then set it to context
                  const value = toCurrency(val);
                  this.setValueState({ [id]: value });
                  this.onSubmit(values);
                }}
              />
              <InputCurrency
                {... this.inputCurrencyProps}
                labelText={`${q3.qStart} – ${q3.qEnd} ${inputLabel}`}
                id="quarter3"
                name="quarter3"
                disabled={applyAll}
                onBlur={(val, { id }) => {
                  // convert val to currency then set it to context
                  const value = toCurrency(val);
                  this.setValueState({ [id]: value });
                  this.onSubmit(values);
                }}
              />
              <InputCurrency
                {... this.inputCurrencyProps}
                labelText={`${q4.qStart} – ${q4.qEnd} ${inputLabel}`}
                id="quarter4"
                name="quarter4"
                disabled={applyAll}
                onBlur={(val, { id }) => {
                  // convert val to currency then set it to context
                  const value = toCurrency(val);
                  this.setValueState({ [id]: value });
                  this.onSubmit(values);
                }}
              />
              <Button
                type="submit"
                text={inputProps.buttonText}
                onClick={() => {
                  this.setState({ submitted: true }, () => this.onSubmit(values));
                }}
              />
            </Fragment>
          )
        }
        </Form>
        <FormContext.Consumer>
          {
          () => (
            submitted && (
              <Output {...values} vars={vars} />
            )
          )
        }
        </FormContext.Consumer>
      </FormProvider>
    );
  }
}

export default Calculator;
