import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Header from './Header';


describe('Header', () => {
  it('should render without crashing', () => {
    const { getByTitle } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(getByTitle('Go to home')).toBeInTheDocument();
  });
});
