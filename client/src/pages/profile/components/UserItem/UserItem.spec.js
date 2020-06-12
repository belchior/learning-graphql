import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import UserItemDefault, { UserItem } from './UserItem';
import { TestRenderer } from 'utils/test';
import { organization, organizationMockResolvers, profileOwnerUser } from 'utils/mockData';


describe('UserItem default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'organizationLogin' };
    const Component = (props) => {
      const { profile } = props;
      const user = profile.people.edges[0].node;
      return (
        <MemoryRouter>
          <UserItemDefault user={user} />;
        </MemoryRouter>
      );
    };
    const query = graphql`
      query UserItemSpecQuery($login: String!) @relay_test_operation {
        profile(login: $login) {
          ... on Organization {
            people(first: 10) {
              edges {
                node {
                  ...UserItemRelay_user
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
      operation => MockPayloadGenerator.generate(operation, organizationMockResolvers)
    );

    const userName = organization.people?.edges[0].node.name;
    const userTitle = getByText(userName);
    expect(userTitle).toBeInTheDocument();
  });
});

describe('UserItem', () => {
  it('should render the avatar of the user', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );
    const userAvatar = getByAltText(profileOwnerUser.login);
    expect(userAvatar).toBeInTheDocument();
  });

  it('should render a link containing the name of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );

    const userName = getByText(profileOwnerUser.name);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveAttribute('href', profileOwnerUser.url);
  });

  it('should render a link containing the login of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );
    const userLogin = getByText(profileOwnerUser.login);
    expect(userLogin).toBeInTheDocument();
    expect(userLogin).toHaveAttribute('href', profileOwnerUser.url);
  });

  it('should render the bio of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );

    const userBio = getByText(profileOwnerUser.bio);
    expect(userBio).toBeInTheDocument();
  });

  it('should render the company of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );

    const userCompany = getByText(profileOwnerUser.company);
    expect(userCompany).toBeInTheDocument();
  });

  it('should render the location of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserItem user={profileOwnerUser} />
      </MemoryRouter>
    );

    const userLocation = getByText(profileOwnerUser.location);
    expect(userLocation).toBeInTheDocument();
  });
});
