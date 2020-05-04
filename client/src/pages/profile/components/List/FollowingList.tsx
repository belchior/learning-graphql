import React from 'react';

import List from './List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IUser } from 'utils/interfaces';
import { edgesToArray } from 'utils/array';


interface IProps {
  user: IUser
}

const FollowingList = (props: IProps) => {
  const { user } = props;
  const following = edgesToArray(user.following || { edges: [] });

  return (
    <List>
      {following.map(user => <UserItem user={user} key={user.id} />)}
    </List>
  );
};

export default FollowingList;
