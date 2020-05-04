import React from 'react';

import List from './List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IUser } from 'utils/interfaces';
import { edgesToArray } from 'utils/array';


interface IProps {
  user: IUser
}

const FollowersList = (props: IProps) => {
  const { user } = props;
  const followers = edgesToArray(user.followers || { edges: [] });

  return (
    <List>
      { followers.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default FollowersList;
