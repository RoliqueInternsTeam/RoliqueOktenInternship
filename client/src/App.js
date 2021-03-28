import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router';

import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';

function App() {
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>

    </div>
  );
}

export default App;
