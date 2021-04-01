import React, { useContext } from 'react';
import Input from '../../Elements/Input/Input';
import classes from './Search.module.css';
import SearchContext from '../../../context/searchContext';

const Search = () => {
  const searchContext = useContext(SearchContext);
  // const searchHandler = (event) => {
  //   searchContext.search = event.target.value;
  //   console.log(searchContext.search);
  // };

  return (
    <div className={classes.Search}>
      <Input
        placeholder='Search'
        onChange={(event) => {
          searchContext.searchHandler(event);
        }}
      />
    </div>
  );
};

export default Search;
