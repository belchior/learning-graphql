import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Anchor from './Anchor';


describe('Anchor', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Anchor href="/user">User name</Anchor>
      </MemoryRouter>
    );
    expect(getByText('User name')).toBeInTheDocument();
  });

  it('shouldn\'t change the attribute href when the attribute external is provided', () => {
    const href = 'http://external.com';
    const { getByText } = render(
      <MemoryRouter>
        <Anchor href={href} external>external</Anchor>
      </MemoryRouter>
    );
    const anchorElement = getByText('external').closest('a');

    expect(anchorElement).toHaveAttribute('href', href);
  });
});
