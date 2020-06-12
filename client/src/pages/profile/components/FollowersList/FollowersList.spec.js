import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import FollowersListDefault from './FollowersList';
import { userMockResolvers } from 'utils/mockData';
import { TestRenderer } from 'utils/test';


describe('FollowersList default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'test' };
    const Component = (props) => (
      <MemoryRouter>
        <FollowersListDefault user={props.profile} />
      </MemoryRouter>
    );
    const query = graphql`
      query FollowersListSpecQuery($login: String! $cursor: String!) @relay_test_operation {
        profile(login: $login) {
          ... on User {
            ...FollowersListRelay_user @arguments(cursor: $cursor)
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

    const followersList = getAllByTestId('user-item');
    expect(followersList).toHaveLength(1);
  });
});
