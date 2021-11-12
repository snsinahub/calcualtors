import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '@massds/mayflower-react';
import { encode, addUrlProps, UrlQueryParamTypes, replaceInUrlQuery } from 'react-url-query';
import SelectBox from '@massds/mayflower-react/es/components/forms/SelectBox';
import { years } from '../../utils';
import PartZeroProps from '../../data/PartZero.json';


import '../../css/index.css';

/**
 * Manually specify how to deal with changes to URL query param props.
 * We do this since we are not using a urlPropsQueryConfig.
 */
const mapUrlChangeHandlersToProps = () => ({
  onChangeYear: (value) => replaceInUrlQuery('year', encode(UrlQueryParamTypes.string, value))
});

const Part0 = (props) => {
  const { onChangeYear } = props;
  // Base variables provided in the base variable json.
  return(
    <FormContext.Consumer>
      {
          (context) => {
            const {
              year
            } = context;
            const yearOptions = years.map((y) => ({ text: y, value: y }));
            return(
              <SelectBox
                id="year"
                name="year"
                label={PartZeroProps.question}
                onChangeCallback={({ selected }) => {
                  context.updateState({
                    year: selected
                  });
                  onChangeYear(selected);
                }}
                options={yearOptions}
                selected={year}
              />
            );
          }

        }
    </FormContext.Consumer>
  );
};

Part0.propTypes = {
  /** Functions that push changed context props to the url. */
  onChangeYear: PropTypes.func
};

export default addUrlProps({ mapUrlChangeHandlersToProps })(Part0);
