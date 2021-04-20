import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';

const App = () => {
  const access_token = useSelector(({ access_token }) => access_token);

    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Layout} />
    </Switch>;

    return access_token ? <Layout /> : <Login />;
};

export default App;
