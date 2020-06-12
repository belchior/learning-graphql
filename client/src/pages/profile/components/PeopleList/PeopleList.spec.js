import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import PeopleListDefault from './PeopleList';
import { organizationMockResolvers } from 'utils/mockData';
import { TestRenderer } from 'utils/test';


describe('PeopleList default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'test' };
    const Component = (props) => (
      <MemoryRouter>
        <PeopleListDefault organization={props.profile} />
      </MemoryRouter>
    );
    const query = graphql`
      query PeopleListSpecQuery($login: String! $cursor: String!) @relay_test_operation {
        profile(login: $login) {
          ... on Organization {
            ...PeopleListRelay_organization @arguments(cursor: $cursor)
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
      operation => MockPayloadGenerator.generate(operation, organizationMockResolvers)
    );

    const peopleList = getAllByTestId('user-item');
    expect(peopleList).toHaveLength(1);
  });
});
