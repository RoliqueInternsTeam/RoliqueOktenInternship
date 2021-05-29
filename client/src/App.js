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
import { SOMETHING_WRONG } from './config/messages';
import Sidebar from './Components/Sidebar/Sidebar';
import CreateCampaign from './Components/CreateCampaign/CreateCampaign';

const App = () => {
  const access_token = useSelector(({ access_token }) => access_token);
  const badRequest = useSelector(({ badRequest }) => badRequest);

  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      {
        access_token
          ? (
            <>
              { badRequest ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={SOMETHING_WRONG} /> : null }
              <Sidebar />
              <Switch>
                <Route exact path="/users/create" component={CreateInternalUser} />
                <Route path="/users/edit" component={EditInternalUser} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/influencers/create" component={CreateInfluencer} />
                <Route exact path="/influencers" component={Influencers} />
                <Route path="/influencer/edit" component={EditInfluencer} />
                <Route path="/influencer" component={Influencer} />
                <Route path="/campaigns/create" component={CreateCampaign} />

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
