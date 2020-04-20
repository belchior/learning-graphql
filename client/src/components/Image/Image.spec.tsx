import React from 'react';
import { render } from '@testing-library/react';

import Image from './Image';


describe('Image', () => {
  it('should render without crashing', () => {
    const { getByAltText } = render(
      <Image src="/path/to/file" alt="alternative text" />
    );
    expect(getByAltText('alternative text')).toBeInTheDocument();
  });
});
