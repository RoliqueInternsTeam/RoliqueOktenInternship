import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';
import CreateInternalUser from './Components/CreateInternalUser/CreateInternalUser';
import EditInternalUser from './Components/EditInternalUser/EditInternalUser';
import Influencers from './Components/Influencers/Influencers';
import Influencer from './Components/Influencer/Influencer';
import CreateInfluencer from './Components/CreateInfluencer/CreateInfluencer';
import EditInfluencer from './Components/EditInfluencer/EditInfluencer';
import Message from './Components/Elements/Message/Message';
import { SOMETHING_WRONG } from './config/messages';
import Sidebar from './Components/Sidebar/Sidebar';

const App = () => {
  const access_token = useSelector(({ access_token }) => access_token);
  const badRequest = useSelector(({ badRequest }) => badRequest);

  return (
    <Switch>
      <Route exact path="/login" render={() => (access_token ? <Redirect to="/" /> : <Login />)} />
      {
        access_token
          ? (
            <Route path="/">
              { badRequest ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={SOMETHING_WRONG} /> : null }
              <Sidebar />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/create" component={CreateInternalUser} />
              <Route exact path="/users/edit" component={EditInternalUser} />
              <Route exact path="/influencers" component={Influencers} />
              <Route exact path="/influencer" component={Influencer} />
              <Route exact path="/influencers/create" component={CreateInfluencer} />
              <Route exact path="/influencer/edit" component={EditInfluencer} />
              <Route render={() => <Redirect to="/users" />} />
            </Route>
          ) : <Redirect to="/login" />
      }
    </Switch>
  );
};

export default App;
