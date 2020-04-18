import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  organization: graphql`
    fragment PeopleListRelay_organization on Organization
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      people(first: $count after: $cursor)
        @connection(key: "PeopleList_people") {
        edges {
          node {
            id
            ...UserItemRelay_user
          }
        }
      }
    }
  `
};

export const connectionConfig = {
  getVariables,
  query: graphql`
      query PeopleListRelayQuery($cursor: String $login: String!) {
      organization(login: $login) {
        ...PeopleListRelay_organization @arguments(cursor: $cursor)
      }
    }
  `
};
