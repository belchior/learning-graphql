import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from '../Item/UserItem';
import { edgesToArray } from 'utils/array';
import { getVariables } from 'pages/profile/Profile.relay';
import { IRelay, IOrganization } from 'utils/interfaces';


interface IProps {
  relay: IRelay
  organization: IOrganization
}

const PeopleList = (props: IProps) => {
  const { relay, organization } = props;
  const people = edgesToArray(organization.people);

  return (
    <List relay={relay}>
      { people.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default createPaginationContainer(
  PeopleList,
  {
    organization: graphql`
      fragment PeopleList_organization on Organization
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        people(first: $count after: $cursor)
          @connection(key: "PeopleList_people") {
          edges {
            node {
              id
              ...UserItem_user
            }
          }
        }
      }
    `
  },
  {
    getVariables,
    query: graphql`
      query PeopleListQuery($cursor: String $login: String!) {
        organization(login: $login) {
          ...PeopleList_organization @arguments(cursor: $cursor)
        }
      }
    `
  }
);
