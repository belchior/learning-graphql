import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';

import RepositoryItemDefault, { RepositoryItem } from './RepositoryItem';
import { TestRenderer } from 'utils/test';
import { repository, user, userMockResolvers } from 'utils/mockData';


describe('RepositoryItem default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'userLogin' };
    const Component = (props) => {
      const { profile } = props;
      const repository = profile.repositories.edges[0].node;
      return <RepositoryItemDefault repository={repository} />;
    };
    const query = graphql`
      query RepositoryItemSpecQuery($login: String!) @relay_test_operation {
        profile(login: $login) {
          ... on User {
            repositories(first: 10) {
              edges {
                node {
                  ...RepositoryItemRelay_repository
                }
              }
            }
          }
        }
      }
    `;

    const { getByText } = render(
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

    const repositoryName = user.repositories?.edges[0].node.name;
    const repositoryTitle = getByText(repositoryName);
    expect(repositoryTitle).toBeInTheDocument();
  });
});

describe('RepositoryItem', () => {
  it('should render the name of repository', () => {
    const { getByText } = render(<RepositoryItem repository={repository} />);
    const repositoryName = getByText(repository.name);
    expect(repositoryName).toBeInTheDocument();
  });

  it('should render the description of repository', () => {
    const { getByText } = render(<RepositoryItem repository={repository} />);
    const repositoryDescription = getByText(repository.description);
    expect(repositoryDescription).toBeInTheDocument();
  });

  it('should render the fork count of repository', () => {
    const { getByText } = render(<RepositoryItem repository={repository} />);
    const repositoryForkCount = getByText(String(repository.forkCount));
    expect(repositoryForkCount).toBeInTheDocument();
  });

  it('should render the license info of repository', () => {
    const { getByText } = render(<RepositoryItem repository={repository} />);

    const repositoryLicenseInfo = getByText(repository.licenseInfo.name);
    expect(repositoryLicenseInfo).toBeInTheDocument();
  });
});
