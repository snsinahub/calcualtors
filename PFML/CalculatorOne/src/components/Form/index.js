import React, { Component } from 'react';
import { InputCurrency, InputRadioGroup, CalloutAlert, InputText } from '@massds/mayflower-react';
import { FormContext } from './context';
import Part1 from './Part1';

import './index.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_mass_employees: true,
      employees_w2: null,
      employees_1099: null,
      updateState: (newState) => this.setState(newState)
    }
  }
  render() {
    return (
      <FormContext.Provider value={this.state}>
        <form class="ma__form-page" action="#">
          <Part1 />
          <hr />
        </form>
      </FormContext.Provider>
    );
  }
}


Form.contextType = FormContext;

export default Form;
