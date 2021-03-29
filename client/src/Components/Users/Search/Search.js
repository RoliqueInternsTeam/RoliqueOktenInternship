import React from 'react';
import Input from '../../Elements/Input/Input';
import classes from './Search.module.css';
// import SearchIcon from '../../Elements/Icons/search.svg';

const Search = () => (
  <div className={classes.Search}>
    {/* <img className={classes.icon} src={SearchIcon} alt='Search' /> */}
    <Input placeholder='Search' />
  </div>
);

export default Search;
