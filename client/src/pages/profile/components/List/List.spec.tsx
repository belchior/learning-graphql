import React from 'react';
import { render } from '@testing-library/react';

import List from './List';


describe('List', () => {
  it('should render a message when the list is empty', () => {
    const props = {
      children: []
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('There is no item to show')).toBeInTheDocument();
  });

  it('should render item when it was provided', () => {
    const props = {
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('list item')).toBeInTheDocument();
  });
});
