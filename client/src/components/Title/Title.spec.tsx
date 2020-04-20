import React from 'react';
import { render } from '@testing-library/react';

import Title from './Title';


describe('Title', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Title>title text</Title>
    );
    expect(getByText('title text')).toBeInTheDocument();
  });
});
