import { gql } from '@apollo/client';

import * as UserSidebar from './components/UserSidebar/UserSidebar.gql';
import * as FollowersList from './components/List/FollowersList.gql';
import * as FollowingList from './components/List/FollowingList.gql';
import * as RepositoriesList from './components/List/RepositoriesList.gql';
import * as StarredRepositoriesList from './components/List/StarredRepositoriesList.gql';
import * as OrganizationHeader from './components/OrganizationHeader/OrganizationHeader.gql';
import * as PeopleList from './components/List/PeopleList.gql';


export const query = gql`
  query ProfileQuery(
    $followers: Boolean!
    $following: Boolean!
    $login: String!
    $people: Boolean!
    $repositories: Boolean!
    $starredRepositories: Boolean!
  ) {
    profile(login: $login) {
      ... on User {
        ...FollowersList_fragment_user @include(if: $followers)
        ...FollowingList_fragment_user @include(if: $following)
        ...RepositoriesList_fragment_owner @include(if: $repositories)
        ...StarredRepositoriesList_fragment_user @include(if: $starredRepositories)
        ...UserSidebar_fragment_profile
      }

      ... on Organization {
        ...OrganizationHeader_fragment_profile
        ...PeopleList_fragment_organization @include(if: $people)
        ...RepositoriesList_fragment_owner @include(if: $repositories)
      }
    }
  }

  ${FollowersList.fragment.user}
  ${FollowingList.fragment.user}
  ${OrganizationHeader.fragment.profile}
  ${PeopleList.fragment.organization}
  ${RepositoriesList.fragment.owner}
  ${StarredRepositoriesList.fragment.user}
  ${UserSidebar.fragment.profile}
`;
