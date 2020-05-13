import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import NotFound from 'pages/notfound/NotFound';
import OrganizationProfile from './components/OrganizationProfile/OrganizationProfile';
import UserProfile from './components/UserProfile/UserProfile';
import { TUserTabs, TOrganizationTabs } from 'utils/interfaces';
import { environment } from 'utils/environment';
import { query } from './Profile.relay';
import { useQueryString } from 'utils/hooks';
import { TTabs } from 'utils/interfaces';
import { Typography } from '@material-ui/core';


interface IRenderProps {
  error: Error | null
  props: any
  retry: (() => void) | null
}

const tabs: TTabs[] = ['repositories', 'starredRepositories', 'followers', 'following', 'people'];

const Loading = () => (
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

const Profile = () => {
  const params = useParams<{ login: string }>();
  const [search] = useQueryString();
  const tabIndex = Math.max(0, tabs.indexOf(search.get('tab') as TTabs));
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
      render={(renderProps: IRenderProps) => {
        const { error, props } = renderProps;
        if (error) return <div>Error!</div>;
        if (!props) return (
          <React.Fragment>
            <Loading />
            <Typography align="center">Loading...</Typography>
          </React.Fragment>
        );

        switch (props.profile?.__typename) {
          case 'User': return <UserProfile {...props as any} tabName={tabName as TUserTabs} />;
          case 'Organization': return <OrganizationProfile {...props as any} tabName={tabName as TOrganizationTabs} />;
          default: return <NotFound />;
        }
      }}
    />
  );
};

export default Profile;
