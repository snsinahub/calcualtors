import React from 'react';
import numbro from 'numbro';
import PropTypes from 'prop-types';
import { HelpTip } from '@massds/mayflower-react';
import ContributionVariables from '../data/ContributionVariables.json';

export const toCurrency = (number) => {
  const currency = numbro(number).formatCurrency({ thousandSeparated: true, mantissa: 2, spaceSeparated: false });
  return currency;
};

export const toPercentage = (number, decimal) => {
  const mantissa = decimal || 0;
  const percent = numbro(number).format({ output: 'percent', mantissa, spaceSeparated: false });
  return percent;
};

export const replaceTextVariable = (fullText, replaceText, variable) => ((replaceText && fullText.indexOf(replaceText) >= 0) ? fullText.replace(replaceText, variable) : fullText);

export const getHelpTip = ({
  text, triggerText, helpText, variable
}, theme, key, value) => {
  const newHelpText = helpText.map((htext) => replaceTextVariable(htext, variable, value));
  return(
    <HelpTip
      key={key}
      text={replaceTextVariable(text, variable, value)}
      triggerText={triggerText}
      helpText={newHelpText}
      id={key}
      hasMarkup
      bypassMobileStyle={process.env.REACT_APP_IFRAME !== 'false'}
      theme={theme || 'c-primary'}
    />
  );
};

getHelpTip.propTypes = {
  text: PropTypes.string,
  triggerText: PropTypes.arrayOf(PropTypes.string),
  helpText: PropTypes.arrayOf(PropTypes.string),
  variable: PropTypes.string
};


export const years = Object.keys(ContributionVariables.baseVariables);

export const parseYear = (date) => {
  const dateObj = date || new Date(); // Default to today's date
  const year = `${dateObj.getFullYear()}`; // Convert number to string
  return year;
};

export const getValidYear = (year) => {
  const validYear = years.indexOf(year) > -1 ? year : parseYear(); // If the input year doesn't exist in ContributionVariables.json, default to current year
  return validYear;
};

export const getVarsFromLeaveDate = ({ dateString, yearString }) => {
  const date = new Date(dateString);
  const year = date.getFullYear() || yearString;
  const variables = ContributionVariables.baseVariables[year];
  return variables;
};
