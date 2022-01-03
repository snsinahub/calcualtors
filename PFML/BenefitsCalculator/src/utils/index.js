import React from 'react';
import numbro from 'numbro';
import { HelpTip } from '@massds/mayflower-react';
import BenefitsVariables from '../data/BenefitsVariables.json';

// eslint-disable-next-line import/prefer-default-export
export const getHelpTip = (question, theme, key) => (
  <HelpTip
    text={question.content}
    triggerText={question.triggerText}
    id={`help-tip-${question.triggerText}`}
    labelID={`help-tip-${question.triggerText}-label`}
    theme={theme || 'c-primary'}
    helpText={question.helpText}
    key={key}
    hasMarkup
    bypassMobileStyle={process.env.REACT_APP_IFRAME !== 'false'}
  />
);

export const getIframeProps = () => {
  const helptipIframeProp = {};
  if (process.env.REACT_APP_IFRAME === 'true') {
    helptipIframeProp.bypassMobileStyle = true;
  }
  return helptipIframeProp;
};


export const toCurrency = (number) => {
  const currency = number && numbro(number).formatCurrency({ thousandSeparated: true, mantissa: 2, spaceSeparated: false });
  return currency;
};

export const toPercentage = (number, decimal) => {
  const mantissa = decimal || 0;
  const percent = number && numbro(number).format({ output: 'percent', mantissa, spaceSeparated: false });
  return percent;
};

export const sum = (a, b) => a + b;

export const toBoolean = (string) => {
  if (typeof string === 'string') {
    return(string === 'true');
  }
  return string;
};

export const years = Object.keys(BenefitsVariables.baseVariables);

export const getVarsFromLeaveDate = ({ dateString, yearString }) => {
  const date = new Date(dateString);
  const year = date.getFullYear() || yearString;
  const variables = BenefitsVariables.baseVariables[year];
  return variables;
};


export const parseDate = ({ date, separator }) => {
  const dateObj = date || new Date(); // Default to today's date
  const sp = separator || '-'; // Default to - as separator
  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1; // As January is 0.
  const yyyy = dateObj.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  return{
    day: dd,
    month: mm,
    year: yyyy,
    date: mm + sp + dd + sp + yyyy
  };
};

export const formDate = ({
  day, month, year, separator
}) => {
  let dd = day;
  let mm = month;
  const yyyy = year;
  const sp = separator || '-'; // Default to - as separator

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  return(mm + sp + dd + sp + yyyy);
};

export const monthLookup = ({ month, monthValue, options }) => {
  if (month) {
    const found = options.find((m) => m.text === month);
    return found.value;
  } if (monthValue) {
    const found = options.find((m) => m.value === Number(monthValue));
    return found.text;
  }
  return null;
};
