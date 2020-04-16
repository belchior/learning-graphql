import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import NotFound from 'pages/notfound/NotFound';
import OrganizationProfile from './components/OrganizationProfile/OrganizationProfile';
import UserProfile from './components/UserProfile/UserProfile';
import { environment } from 'utils/environment';
import { query } from './Profile.relay';
import { useQueryString } from 'utils/hooks';


const tabs = ['repositories', 'starredRepositories', 'followers', 'following', 'people'];

const Loading = props => (
  <Skeleton
    style={{
      background: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
      height: '3px',
      position: 'absolute',
      left: 0,
      top: 0,
    }}
  />
);

const Profile = props => {
  const params = useParams();
  const [search] = useQueryString();
  const tabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const tabName = tabs[tabIndex];
  const variables = {
    followers: tabName === 'followers',
    following: tabName === 'following',
    login: params.login,
    people: tabName === 'people',
    repositories: tabName === 'repositories',
    starredRepositories: tabName === 'starredRepositories',
  };

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={(queryProps) => {
        const { error, props } = queryProps;
        if (error) return <div>Error!</div>;
        if (!props) return <Loading />;
        if (props.profile && props.profile.__typename === 'User') return <UserProfile {...props} tabName={tabName} />;
        if (props.profile && props.profile.__typename === 'Organization') return <OrganizationProfile {...props} />;
        return <NotFound />;
      }}
    />
  );
};

export default Profile;
