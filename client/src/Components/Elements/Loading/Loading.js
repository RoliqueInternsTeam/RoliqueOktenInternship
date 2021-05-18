import HashLoader from 'react-spinners/HashLoader';
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Loading.module.css';

const Loading = (props) => (
  <div className={classes[props.class]}>
    <HashLoader size={100} color='#121033' />
  </div>
);

Loading.propTypes = {
  class: PropTypes.oneOf(['onBlankPage', 'onList']).isRequired,
};

export default Loading;
