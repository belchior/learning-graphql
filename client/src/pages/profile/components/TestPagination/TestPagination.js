import React from 'react';
import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { createPaginationContainer } from 'react-relay';
import { useParams } from 'react-router-dom';

import RepositoryItem from '../Item/RepositoryItem';
import { edgesToArray } from 'utils/array';
import { environment } from 'utils/environment';


const query = graphql`
  query TestPaginationQuery($login: String! $cursor: String) {
    user(login: $login) {
      ...TestPagination_user @arguments(cursor: $cursor)
    }
  }
`;

const TestPaginationView = props => {
  const { relay, user } = props;

  const repositories = edgesToArray(user.repositories);
  const handleLoadMore = () => {
    if (relay.hasMore() === false || relay.isLoading() === true) return;
    relay.loadMore();
  };

  return (
    <div style={{ flex: '1' }}>
      {repositories.map(repo => <RepositoryItem repository={repo} key={repo.id} />)}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Button onClick={handleLoadMore} disabled={relay.hasMore() === false}>
          {relay.hasMore() ? 'Load more' : 'No more items to be loaded'}
        </Button>
      </div>
    </div>
  );
};

const TestPaginationContianer = createPaginationContainer(TestPaginationView,
  {
    user: graphql`
      fragment TestPagination_user on User @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 5 }
      ) {
        repositories(first: $count after: $cursor) @connection(key: "TestPagination_repositories") {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
      }
    `
  },
  {
    query: query,
    getVariables: (props, { count, cursor }, fragmentVariables) => ({
      count,
      cursor,
      login: fragmentVariables.login,
    }),
  }
);

const TestPagination = props => {
  const params = useParams();
  const variables = {
    login: params.login
  };

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>Error!</div>;
        if (!props) return <div>Loading...</div>;
        return <TestPaginationContianer user={props.user} isLoading={false}  />;
      }}
    />
  );
};

export default TestPagination;
