import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IRelay, IUser } from 'utils/interfaces';
import { connectionConfig, fragmentSpec } from './FollowersList.relay';
import { edgesToArray } from 'utils/array';


interface IProps {
  relay: IRelay
  user: IUser
}

const FollowersList = (props: IProps) => {
  const { relay, user } = props;
  const followers = edgesToArray(user.followers || { edges: [] });

  return (
    <List relay={relay}>
      { followers.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default createPaginationContainer(FollowersList, fragmentSpec, connectionConfig);
