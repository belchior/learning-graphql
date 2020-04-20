import React from 'react';
import { render } from '@testing-library/react';

import Label from './Label';


describe('Label', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Label>label text</Label>
    );
    expect(getByText('label text')).toBeInTheDocument();
  });
});
