import React, { Component } from 'react';
import { InputCurrency, InputRadioGroup, CalloutAlert } from '@massds/mayflower-react';

import './index.css';


class Form extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
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
          onChange={(e) => console.log(e.selected)}
          />

          <CalloutAlert>
            <p>You are not required to remit payment to the department starting 7/1. </p>
          </CalloutAlert>
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
              required />
          </div>
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
              required />
          </div>
        </fieldset>
        <hr />
      </form>
    );
  }
}

export default Form;
