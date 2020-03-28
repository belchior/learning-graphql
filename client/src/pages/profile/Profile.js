import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import NotFound from 'pages/notfound/NotFound';
import Navigator from './components/Navigator/Navigator';
import Sidebar from './components/Sidebar/Sidebar';
import { environment } from 'utils/environment';


const ProfileView = props => {
  const { user } = props;

  return (
    <main>
      <Sidebar user={user} />
      <Navigator />
    </main>
  );
};

const Profile = props => {
  const params = useParams();
  const variables = { login: params.login };
  const query = graphql`
    query ProfileQuery($login: String!) {
      user(login: $login) {
        id
        ...Sidebar_user
      }
    }
  `;

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>Error!</div>;
        if (!props) return <div>Loading...</div>;
        if (!props.user) return <NotFound />;
        return <ProfileView {...props} />;
      }}
    />
  );
};

export default Profile;
