import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import UserSidebarDefault, { UserSidebar } from './UserSidebar';
import { TestRenderer } from 'utils/test';
import { user, userMockResolvers } from 'utils/mockData';


describe('UserSidebar default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const variables = { login: 'userLogin' };
    const Component = (props: any) => (
      <MemoryRouter>
        <UserSidebarDefault profile={props.profile} />
      </MemoryRouter>
    );
    const query = graphql`
      query UserSidebarSpecQuery($login: String!) @relay_test_operation {
        profile(login: $login) {
          ... on User {
            ...UserSidebarRelay_profile
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

    const userLogin = getByText(user.login);
    expect(userLogin).toBeInTheDocument();
  });
});

describe('UserSidebar', () => {
  it('should render the avatar of the user', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    const userAvatar = getByAltText(user.login);
    expect(userAvatar).toBeInTheDocument();
  });

  it('should render the name of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    // @ts-ignore
    const userName = getByText(user.name);
    expect(userName).toBeInTheDocument();
  });

  it('should render the login of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    const userAvatar = getByText(user.login);
    expect(userAvatar).toBeInTheDocument();
  });

  it('should render the bio of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    // @ts-ignore
    const userBio = getByText(user.bio);
    expect(userBio).toBeInTheDocument();
  });

  it('should render the email of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    const userEmail = getByText(user.email);
    expect(userEmail).toBeInTheDocument();
  });

  it('should render the websiteUrl of the user', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserSidebar profile={user} />
      </MemoryRouter>
    );
    // @ts-ignore
    const userWebsiteUrl = getByText(user.websiteUrl);
    expect(userWebsiteUrl).toBeInTheDocument();
  });
});
