import React from 'react';
import { render } from '@testing-library/react';

import AppProvider from './AppProvider';
import Route from 'components/Route/Route';

jest.mock('components/Route/Route');
const MockedRoute = () => <div>mocked route component</div>;

describe('AppProvider', () => {
  it('should render without crashing', () => {
    Route.mockImplementationOnce(() => <MockedRoute />);

    const { getByText } = render(
      <AppProvider />
    );
    expect(getByText('mocked route component')).toBeInTheDocument();
  });
});
