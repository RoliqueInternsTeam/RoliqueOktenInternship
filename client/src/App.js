import './App.css';
import React from "react";
import { Route, Switch } from 'react-router';

import Sidebar from "./Components/Sidebar/Sidebar";
import Login from "./Components/Login/Login";

function App() {

  return (
    <div>
        <Sidebar/>

        <Switch>
            <Route path="/login" component={Login} />

        </Switch>

    </div>
  );
}

export default App;
