import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from '../List/List';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import { IOrganization, IRelay } from 'utils/interfaces';
import { connectionConfig, fragmentSpec } from './PeopleList.relay';
import { edgesToArray } from 'utils/array';


interface IProps {
  relay: IRelay
  organization: IOrganization
}

const PeopleList = (props: IProps) => {
  const { relay, organization } = props;
  const people = edgesToArray(organization.people || { edges: [] });

  return (
    <List relay={relay}>
      { people.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default createPaginationContainer(PeopleList, fragmentSpec, connectionConfig);
