import graphql from 'babel-plugin-relay/macro';


export const query = graphql`
  query ProfileRelayQuery(
    $cursor: String
    $followers: Boolean!
    $following: Boolean!
    $login: String!
    $people: Boolean!
    $repositories: Boolean!
    $starredRepositories: Boolean!
  ) {
    profile(login: $login) {
      id
      __typename
      ... on User {
        ...UserSidebar_profile
        ...FollowersList_user @include(if: $followers) @arguments(cursor: $cursor)
        ...FollowingList_user @include(if: $following) @arguments(cursor: $cursor)
        ...RepositoriesList_owner @include(if: $repositories) @arguments(cursor: $cursor)
        ...StarredRepositoriesList_user @include(if: $starredRepositories) @arguments(cursor: $cursor)
      }

      ... on Organization {
        ...OrganizationHeader_profile
        ...RepositoriesList_owner @include(if: $repositories) @arguments(cursor: $cursor)
        ...PeopleList_organization @include(if: $people) @arguments(cursor: $cursor)
      }
    }
  }
`;

export const getVariables = (props, paginationInfo, fragmentVariables) => ({
  count: fragmentVariables.count,
  cursor: paginationInfo.cursor,
  login: fragmentVariables.login,
  followers: fragmentVariables.followers,
  following: fragmentVariables.following,
  people: fragmentVariables.people,
  repositories: fragmentVariables.repositories,
  starredRepositories: fragmentVariables.starredRepositories,
});

export const connectionConfig = { getVariables, query };
