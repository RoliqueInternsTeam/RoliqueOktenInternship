import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import Message from '../Elements/Message/Message';
import { SOMETHING_WRONG } from '../../config/messages';
import Sidebar from '../Sidebar/Sidebar';
import Users from '../Users/Users';
import CreateInternalUser from '../CreateInternalUser/CreateInternalUser';
import EditInternalUser from '../EditInternalUser/EditInternalUser';
import Influencers from '../Influencers/Influencers';
import Influencer from '../Influencer/Influencer';
import CreateInfluencer from '../CreateInfluencer/CreateInfluencer';
import EditInfluencer from '../EditInfluencer/EditInfluencer';

const Layout = () => {
  const badRequest = useSelector(({ badRequest }) => badRequest);

  return (
    <div>
      { badRequest ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={SOMETHING_WRONG} /> : null }
      <Sidebar />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/create" component={CreateInternalUser} />
        <Route exact path="/users/edit" component={EditInternalUser} />
        <Route exact path="/influencers" component={Influencers} />
        <Route exact path="/influencer" component={Influencer} />
        <Route exact path="/influencers/create" component={CreateInfluencer} />
        <Route exact path="/influencer/edit" component={EditInfluencer} />
      </Switch>
    </div>
  );
};

export default Layout;
