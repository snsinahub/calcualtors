import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectBox from '@massds/mayflower-react/es/components/forms/SelectBox';
import InputNumber from '@massds/mayflower-react/es/components/forms/InputNumber';
import inputProps from '../../data/dateInput.json';
import { years, monthLookup } from '../../utils';
import './index.css';

const DateInput = ({ onSubmit, today }) => {
  const [day, setDay] = useState(today.day);
  const [month, setMonth] = useState(today.month);
  const [year, setYear] = useState(today.year);

  return(
    <fieldset>
      <legend>{inputProps.legend}</legend>
      <div className="date-input-group">
        <SelectBox
          id="month-select"
          label={inputProps.monthLabel}
          onChangeCallback={({ selectedValue }) => {
            const newMonth = Number(selectedValue);
            setMonth(newMonth);
            onSubmit({ day, month: newMonth, year });
          }}
          options={inputProps.monthOptions}
          required
          stackLabel
          selected={monthLookup({ monthValue: month, options: inputProps.monthOptions })}
        />
        <InputNumber
          id="day-input"
          labelText="Day"
          max={31}
          min={1}
          name="number-input"
          onChange={(e, value) => {
            const newDay = value;
            setDay(newDay);
            onSubmit({ day: newDay, month, year });
          }}
          step={1}
          width={40}
          required
          defaultValue={day}
        />
        <SelectBox
          id="year-select"
          label={inputProps.yearLabel}
          onChangeCallback={({ selected }) => {
            const newYear = selected;
            setYear(newYear);
            onSubmit({ day, month, year: newYear });
          }}
          options={years.map((y) => ({ text: y, value: y }))}
          required
          stackLabel
          selected={String(year)}
        />
      </div>
    </fieldset>
  );
};

DateInput.propTypes = {
  onSubmit: PropTypes.func,
  today: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.number
  })
};


export default DateInput;
