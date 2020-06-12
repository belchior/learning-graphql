import { graphql } from 'babel-plugin-relay/macro';


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
        ...UserSidebarRelay_profile
        ...FollowersListRelay_user @include(if: $followers) @arguments(cursor: $cursor)
        ...FollowingListRelay_user @include(if: $following) @arguments(cursor: $cursor)
        ...RepositoriesListRelay_owner @include(if: $repositories) @arguments(cursor: $cursor)
        ...StarredRepositoriesListRelay_user @include(if: $starredRepositories) @arguments(cursor: $cursor)
      }

      ... on Organization {
        ...OrganizationHeaderRelay_profile
        ...RepositoriesListRelay_owner @include(if: $repositories) @arguments(cursor: $cursor)
        ...PeopleListRelay_organization @include(if: $people) @arguments(cursor: $cursor)
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
