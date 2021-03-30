import React from 'react';
import Input from '../../Elements/Input/Input';
import classes from './Search.module.css';

const Search = () => (
  <div className={classes.Search}>
    <Input placeholder='Search' />
  </div>
);

export default Search;
