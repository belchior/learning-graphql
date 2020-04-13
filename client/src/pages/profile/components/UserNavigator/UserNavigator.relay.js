import graphql from 'babel-plugin-relay/macro';


export const query = graphql`
  query UserNavigatorRelayQuery(
    $cursor: String
    $followers: Boolean!
    $following: Boolean!
    $login: String!
    $repositories: Boolean!
    $starredRepositories: Boolean!
  ) {
    user(login: $login) {
      ...FollowersList_user
        @include(if: $followers)
        @arguments(cursor: $cursor)

      ...FollowingList_user
        @include(if: $following)
        @arguments(cursor: $cursor)

      ...RepositoriesList_user
        @include(if: $repositories)
        @arguments(cursor: $cursor)

      ...StarredRepositoriesList_user
        @include(if: $starredRepositories)
        @arguments(cursor: $cursor)
    }
  }
`;

export const getVariables = (props, paginationInfo, fragmentVariables) => ({
  count: fragmentVariables.count,
  cursor: paginationInfo.cursor,
  login: fragmentVariables.login,
  followers: fragmentVariables.followers,
  following: fragmentVariables.following,
  repositories: fragmentVariables.repositories,
  starredRepositories: fragmentVariables.starredRepositories,
});
