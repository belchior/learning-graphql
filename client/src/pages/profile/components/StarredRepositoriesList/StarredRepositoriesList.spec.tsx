import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';

import StarredRepositoriesListDefault from './StarredRepositoriesList';
import { userMockResolvers } from 'utils/mockData';
import { TestRenderer } from 'utils/test';


describe('StarredRepositoriesList default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'test' };
    const Component = (props: any) => (
      <StarredRepositoriesListDefault user={props.profile} />
    );
    const query = graphql`
      query StarredRepositoriesListSpecQuery($login: String! $cursor: String!) @relay_test_operation {
        profile(login: $login) {
          ... on User {
            ...StarredRepositoriesListRelay_user @arguments(cursor: $cursor)
          }
        }
      }
    `;
    const { getAllByTestId } = render(
      <TestRenderer
        Component={Component}
        environment={environment}
        query={query}
        variables={variables}
      />
    );

    environment.mock.resolveMostRecentOperation(
      operation => MockPayloadGenerator.generate(operation, userMockResolvers)
    );

    const followingList = getAllByTestId('repository-item');
    expect(followingList).toHaveLength(1);
  });
});
