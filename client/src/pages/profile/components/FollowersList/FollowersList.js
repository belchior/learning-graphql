import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from '../List/List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { connectionConfig, fragmentSpec } from './FollowersList.relay';
import { edgesToArray } from 'utils/array';


const FollowersList = (props) => {
  const { relay, user } = props;
  const followers = edgesToArray(user.followers || { edges: [] });

  return (
    <List relay={relay}>
      { followers.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default createPaginationContainer(FollowersList, fragmentSpec, connectionConfig);
