import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { useParams } from 'react-router-dom';
import { useQuery, QueryHookOptions } from '@apollo/client';

import NotFound from 'pages/notfound/NotFound';
import OrganizationProfile from './components/OrganizationProfile/OrganizationProfile';
import UserProfile from './components/UserProfile/UserProfile';
import { TOrganizationTabs, TTabs, TUserTabs } from 'utils/interfaces';
import { query } from './Profile.gql';
import { useQueryString } from 'utils/hooks';


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
  const options: QueryHookOptions = {
    variables: {
      followers: tabName === 'followers',
      following: tabName === 'following',
      login: params.login,
      people: tabName === 'people',
      repositories: tabName === 'repositories',
      starredRepositories: tabName === 'starredRepositories',
    },
    fetchPolicy: 'no-cache'
  };
  const { loading, error, data } = useQuery(query, options);

  if (error) return <div>Error!</div>;
  if (loading) return <Loading />;

  switch (data.profile?.__typename) {
    case 'User': return <UserProfile {...data as any} tabName={tabName as TUserTabs} />;
    case 'Organization': return <OrganizationProfile {...data as any} tabName={tabName as TOrganizationTabs} />;
    default: return <NotFound />;
  }
};

export default Profile;
