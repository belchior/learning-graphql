import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';

import { environment } from 'utils/environment';
import Navigator from './components/Navigator/Navigator';
import Sidebar from 'components/Sidebar/Sidebar';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const ProfileView = props => {
  const classes = useStyles();
  const { user } = props;

  return (
    <main className={classes.root}>
      <Sidebar user={user} />
      <Navigator />
    </main>
  );
};

const Profile = props => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <QueryRenderer
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }) => {
          if (error) return <div>Error!</div>;
          if (!props) return <div>Loading...</div>;
          return <ProfileView {...props} />;
        }}
      />
    </div>
  );
};

export default Profile;
