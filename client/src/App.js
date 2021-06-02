import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect, Route, Switch,
} from 'react-router';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';
import CreateInternalUser from './Components/CreateInternalUser/CreateInternalUser';
import EditInternalUser from './Components/EditInternalUser/EditInternalUser';
import Influencers from './Components/Influencers/Influencers';
import Influencer from './Components/Influencer/Influencer';
import CreateInfluencer from './Components/CreateInfluencer/CreateInfluencer';
import EditInfluencer from './Components/EditInfluencer/EditInfluencer';
import Message from './Components/Elements/Message/Message';
import Sidebar from './Components/Sidebar/Sidebar';
import Campaigns from './Components/Campaigns/Campaigns';
import CreateCampaign from './Components/CreateCampaign/CreateCampaign';

const App = () => {
  const access_token = useSelector(({ access_token }) => access_token);
  const badRequest = useSelector(({ badRequest }) => badRequest);

  return (
    <Switch>
      <Route exact path='/login' render={() => (access_token ? <Redirect to="/" /> : <Login />)} />
      {
        access_token
          ? (
            <>
              { badRequest ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={badRequest} /> : null }
              <Sidebar />
              <Switch>
                <Route exact path="/users/create" component={CreateInternalUser} />
                <Route path="/users/edit" component={EditInternalUser} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/influencers/create" component={CreateInfluencer} />
                <Route exact path="/influencers" component={Influencers} />
                <Route exact path="/campaigns" component={Campaigns} />
                <Route exact path="/campaigns/create" component={CreateCampaign} />
                <Route path="/influencer/edit" component={EditInfluencer} />
                <Route path="/influencer" component={Influencer} />

                <Route render={() => <Redirect to="/users" />} />
              </Switch>
            </>
          )
          : <Redirect to="/login" />
      }
    </Switch>
  );
};

export default App;
