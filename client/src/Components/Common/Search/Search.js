import React from 'react';
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

export default Search;
