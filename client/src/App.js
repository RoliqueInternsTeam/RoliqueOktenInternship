import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router';

import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';
import CreateInternalUser from './Components/CreateInternalUser/CreateInternalUser';
import EditInternalUser from './Components/EditInternalUser/EditInternalUser';

function App() {
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/create" component={CreateInternalUser} />
        <Route path="/edit" component={EditInternalUser} />
      </Switch>
    </div>
  );
}

export default App;
