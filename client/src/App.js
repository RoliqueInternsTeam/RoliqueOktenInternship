import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router';

import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Users from './Components/Users/Users';
import CreateInternalUser from './Components/CreateInternalUser/CreateInternalUser';
import EditInternalUser from './Components/EditInternalUser/EditInternalUser';
import { SOMETHING_WRONG } from './config/messages';
import Message from './Components/Elements/Message/Message';
import Influencers from './Components/Influencers/Influencers';

function App() {
  // const access_token = useSelector(({ access_token }) => access_token);
  const badRequest = useSelector(({ badRequest }) => badRequest);

  return (
    <div>
      { badRequest ? <Message style={['error-bg-color', 'error-icon-color', 'error-text-color']} position='absolute' message={SOMETHING_WRONG} /> : null }
      <Sidebar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/influencers" component={Influencers} />
        <Route path="/create" component={CreateInternalUser} />
        <Route path="/edit" component={EditInternalUser} />
      </Switch>
    </div>
  );
}

export default App;
