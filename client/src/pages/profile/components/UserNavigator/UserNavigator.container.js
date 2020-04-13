import React from 'react';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import NavigatorView from './UserNavigator.view';
import { environment } from 'utils/environment';
import { useQueryString } from 'utils/hooks';
import { query } from './UserNavigator.relay';
import { tabs } from './common';


const UserNavigator = props => {
  const params = useParams();
  const [search] = useQueryString();
  const tabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const tabName = tabs[tabIndex];
  const variables = {
    login: params.login,
    repositories: tabName === 'repositories',
    starredRepositories: tabName === 'starredRepositories',
    followers: tabName === 'followers',
    following: tabName === 'following',
  };
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>Error!</div>;
        if (!props) return <NavigatorView {...props} isLoading />;
        return <NavigatorView {...props} isLoading={false} />;
      }}
    />
  );
};

export default UserNavigator;
