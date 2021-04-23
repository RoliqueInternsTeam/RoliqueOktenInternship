import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../Elements/Input/Input';
import classes from './Search.module.css';

const Search = (props) => (
  <div className={classes.Search}>
    <Input
      placeholder='Search'
      onChange={(event) => {
        props.search(event);
      }}
    />
  </div>
);

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Search;
