import React, { Component } from 'react';
import { InputCurrency, InputRadioGroup, CalloutAlert } from '@massds/mayflower-react';
import { FormContext } from './context';

import './index.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_mass_employees: true,
      employees_w2: null,
      employees_1099: null
    }
  }
  render() {
    return (
      <FormContext.Provider value={this.state}>
        <form class="ma__form-page" action="#">
          <fieldset>
          <InputRadioGroup
            title="Do you have any employees in Massachusetts?"
            name="mass_employees"
            outline
            defaultSelected="yes"
            errorMsg="You must selected your favorite plant."
            radioButtons={[
              {id: 'yes',value: 'yes',label: 'Yes'},
              {id: 'no',value: 'no',label: 'No'}
            ]}
            onChange={(e) => {
              if(e.selected === 'yes') {
                this.setState({ has_mass_employees: true })
              } else {
                this.setState({ has_mass_employees: false })
              }
            }}
            />
            {
              !this.state.has_mass_employees && (
                <CalloutAlert theme="c-error-red">
                  <p>You are <strong>not required</strong> to remit payment to the department starting 7/1. </p>
                </CalloutAlert>
              )
            }

            <div class="ma__input-group--inline">
              <label
                for="number-input"
                class="ma__label ma__label--inline ma__label--required ">How many of your MA employees receive W2s?
              </label>
              <input
                class="ma__input js-is-required"
                name="number-input"
                id="number-input"
                type="number"
                placeholder="type something"
                data-type="number"
                maxlength="16"
                  pattern="[0-9]*"
                required
                disabled={!this.state.has_mass_employees} />
            </div>
            <div class="ma__input-group--inline">
              <label
                for="number-input"
                class="ma__label ma__label--inline ma__label--required ">How many 1099 contractors have you hired in the past year?
              </label>
              <input
                class="ma__input js-is-required"
                name="number-input"
                id="number-input"
                type="number"
                placeholder="type something"
                data-type="number"
                maxlength="16"
                  pattern="[0-9]*"
                required
                disabled={!this.state.has_mass_employees} />
            </div>
          </fieldset>
          <hr />
        </form>
      </FormContext.Provider>
    );
  }
}


Form.contextType = FormContext;

export default Form;
