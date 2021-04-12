import React from 'react';
import Header from '../Common/Header/Header';
import classes from './Influencers.module.css';
import Search from '../Common/Search/Search';
import List from '../Common/List/List';
import TableRow from '../Common/TableRow/TableRow';

const Influencers = () => (
  <div className={classes.mainContainer}>
    <Header title='Influencers' button='createNew' />
    <div className={classes.body}>
      <Search />
      <List
        column1='Username'
        column2='Name'
        column3='Channels'
        column4='Rating'
        map={(
          <TableRow />
)}
      />
    </div>
  </div>
);

export default Influencers;
