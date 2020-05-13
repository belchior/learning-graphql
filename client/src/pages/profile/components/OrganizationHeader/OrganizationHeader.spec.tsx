import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';
import { render } from '@testing-library/react';

import OrganizationHeaderDefault, { OrganizationHeader } from './OrganizationHeader';
import { organization, organizationMockResolvers } from 'utils/mockData';
import { TestRenderer } from 'utils/test';


describe('OrganizationHeader default', () => {
  it('should render the default component without crashing', () => {
    const environment = createMockEnvironment();
    const query = graphql`
      query OrganizationHeaderSpecQuery($login: String!) @relay_test_operation {
        profile(login: $login) {
          id
          ...OrganizationHeaderRelay_profile
        }
      }
    `;
    const variables = { login: 'test' };
    const { getByText } = render(
      <TestRenderer
        Component={OrganizationHeaderDefault}
        environment={environment}
        query={query}
        variables={variables}
      />
    );

    environment.mock.resolveMostRecentOperation(
      operation => MockPayloadGenerator.generate(operation, organizationMockResolvers)
    );

    // @ts-ignore
    const title = getByText(organization.name);
    expect(title).toBeInTheDocument();
  });
});

describe('OrganizationHeader', () => {
  it('should render the avatar of the organization', () => {
    const profile = organization;
    const { getByAltText } = render(<OrganizationHeader profile={profile} />);

    const organizationAvatar = getByAltText(profile.login);
    expect(organizationAvatar).toBeInTheDocument();
  });

  it('should render the name of the organization', () => {
    const profile = organization;
    const { getByText } = render(<OrganizationHeader profile={profile} />);

    // @ts-ignore
    const organizationName = getByText(profile.name);
    expect(organizationName).toBeInTheDocument();
  });

  it('should render the description of the organization', () => {
    const profile = organization;
    const { getByText } = render(<OrganizationHeader profile={profile} />);

    // @ts-ignore
    const organizationDescription = getByText(profile.description);
    expect(organizationDescription).toBeInTheDocument();
  });

  it('should render the location of the organization', () => {
    const profile = organization;
    const { getByText } = render(<OrganizationHeader profile={profile} />);

    // @ts-ignore
    const organizationLocation = getByText(profile.location);
    expect(organizationLocation).toBeInTheDocument();
  });

  it('should render the a link to website of the organization', () => {
    const profile = organization;
    const { getByText } = render(<OrganizationHeader profile={profile} />);

    // @ts-ignore
    const organizationLink = getByText(profile.websiteUrl);
    expect(organizationLink).toBeInTheDocument();
    expect(organizationLink).toHaveAttribute('href', profile.websiteUrl);
  });
});
