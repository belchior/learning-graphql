import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IRelay, IUser } from 'utils/interfaces';
import { connectionConfig, fragmentSpec } from './FollowingList.relay';
import { edgesToArray } from 'utils/array';


interface IProps {
  relay: IRelay
  user: IUser
}

const FollowingList = (props: IProps) => {
  const { relay, user } = props;
  const following = edgesToArray(user.following || { edges: [] });

  return (
    <List relay={relay}>
      {following.map(user => <UserItem user={user} key={user.id} />)}
    </List>
  );
};

export default createPaginationContainer(FollowingList, fragmentSpec, connectionConfig);
