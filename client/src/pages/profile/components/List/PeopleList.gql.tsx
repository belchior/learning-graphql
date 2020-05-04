import { gql } from '@apollo/client';

import * as UserItem from '../UserItem/UserItem.gql';

export const fragment = {
  organization: gql`
    fragment PeopleList_fragment_organization on Organization {
      people(first: 10) @connection(key: "PeopleList_people") {
        edges {
          node {
            id
            ...UserItem_fragment_user
          }
        }
      }
    }

    ${UserItem.fragment.user}
  `
};
