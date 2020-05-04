import React from 'react';

import List from './List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IOrganization } from 'utils/interfaces';
import { edgesToArray } from 'utils/array';


interface IProps {
  organization: IOrganization
}

const PeopleList = (props: IProps) => {
  const { organization } = props;
  const people = edgesToArray(organization.people || { edges: [] });

  return (
    <List>
      { people.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default PeopleList;
