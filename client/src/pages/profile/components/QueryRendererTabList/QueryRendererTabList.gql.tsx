import { gql } from '@apollo/client';

import * as FollowersList from '../List/FollowersList.gql';
import * as FollowingList from '../List/FollowingList.gql';
import * as RepositoriesList from '../List/RepositoriesList.gql';
import * as StarredRepositoriesList from '../List/StarredRepositoriesList.gql';
import * as PeopleList from '../List/PeopleList.gql';


export const query = gql`
  query QueryRendererTabList(
    $followers: Boolean!
    $following: Boolean!
    $login: String!
    $people: Boolean!
    $repositories: Boolean!
    $starredRepositories: Boolean!
  ) {
    profile(login: $login) {
      id
      ...FollowersList_fragment_user @include(if: $followers)
      ...FollowingList_fragment_user @include(if: $following)
      ...PeopleList_fragment_organization @include(if: $people)
      ...RepositoriesList_fragment_owner @include(if: $repositories)
      ...StarredRepositoriesList_fragment_user @include(if: $starredRepositories)
    }
  }

  ${FollowersList.fragment.user}
  ${FollowingList.fragment.user}
  ${PeopleList.fragment.organization}
  ${RepositoriesList.fragment.owner}
  ${StarredRepositoriesList.fragment.user}
`;
