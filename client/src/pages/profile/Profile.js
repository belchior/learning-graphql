import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import NotFound from 'pages/notfound/NotFound';
import OrganizationProfile from './components/OrganizationProfile/OrganizationProfile';
import UserProfile from './components/UserProfile/UserProfile';
import { environment } from 'utils/environment';


const Loading = props => (
  <Skeleton width="100%" height="3px" style={{ background: 'rgba(255, 255, 255, 0.3)' }} />
);

const Profile = props => {
  const params = useParams();
  const variables = { login: params.login };
  const query = graphql`
    query ProfileQuery($login: String!) {
      profile(login: $login) {
        id
        __typename
        ... on User {
          ...UserSidebar_profile
        }
        ... on Organization {
          ...OrganizationHeader_profile
        }
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
        if (!props) return <Loading />;
        if (props.profile && props.profile.__typename === 'User') return <UserProfile {...props} />;
        if (props.profile && props.profile.__typename === 'Organization') return <OrganizationProfile {...props} />;
        return <NotFound />;
      }}
    />
  );
};

export default Profile;
