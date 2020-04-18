import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { useParams } from 'react-router-dom';

import { environment } from 'utils/environment';


interface IProps {
  Content: Function
  tabName: string
}

const query = graphql`
  query QueryRendererTabListQuery(
    $cursor: String
    $followers: Boolean!
    $following: Boolean!
    $login: String!
    $people: Boolean!
    $repositories: Boolean!
    $starredRepositories: Boolean!
  ) {
    profile(login: $login) {
      ...FollowersList_user @include(if: $followers) @arguments(cursor: $cursor)
      ...FollowingList_user @include(if: $following) @arguments(cursor: $cursor)
      ...PeopleList_organization @include(if: $people) @arguments(cursor: $cursor)
      ...RepositoriesList_owner @include(if: $repositories) @arguments(cursor: $cursor)
      ...StarredRepositoriesList_user @include(if: $starredRepositories) @arguments(cursor: $cursor)
    }
  }
`;

const QueryRendererTabList = (props: IProps) => {
  const { Content, tabName } = props;
  const params = useParams<{ login: string }>();
  const variables = {
    followers: tabName === 'followers',
    following: tabName === 'following',
    login: params.login,
    people: tabName === 'people',
    repositories: tabName === 'repositories',
    starredRepositories: tabName === 'starredRepositories',
  };

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={(queryProps) => {
        const { error, props } = queryProps;
        if (error) return <div>Error!</div>;
        if (!props) return <Content {...props} isLoading />;
        return <Content {...props} isLoading={false} />;
      }}
    />
  );
};

export default QueryRendererTabList;
