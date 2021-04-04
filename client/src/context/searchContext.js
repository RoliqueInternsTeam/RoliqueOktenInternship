import React from 'react';

const searchContext = React.createContext({
  searchHandler: () => {},
  userList: [],
  editUser: {},
});

export default searchContext;
