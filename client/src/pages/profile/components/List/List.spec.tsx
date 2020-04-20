import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import List from './List';
import { IRelay } from 'utils/interfaces';


describe('List', () => {
  it('should render a message when the list is empty', () => {
    const relay: IRelay = {
      hasMore: () => false,
      isLoading: () => false,
      loadMore: () => undefined,
    };
    const props = {
      relay,
      children: []
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('There is no item to show')).toBeInTheDocument();
  });

  it('should render item when it was provided', () => {
    const relay: IRelay = {
      hasMore: () => false,
      isLoading: () => false,
      loadMore: () => undefined,
    };
    const props = {
      relay,
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('list item')).toBeInTheDocument();
  });

  it('should render button named "Load more" when are more data to load', () => {
    const relay: IRelay = {
      hasMore: () => true,
      isLoading: () => false,
      loadMore: () => undefined,
    };
    const props = {
      relay,
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('Load more')).toBeInTheDocument();
  });

  it('should render button named "No more items to show" when there is no more item to load', () => {
    const relay: IRelay = {
      hasMore: () => false,
      isLoading: () => false,
      loadMore: () => undefined,
    };
    const props = {
      relay,
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    expect(getByText('No more items to show')).toBeInTheDocument();
  });

  it('should call relay.loadMore when the "Load more" button is clicked', () => {
    const relay: IRelay = {
      hasMore: jest.fn(() => true),
      isLoading: () => false,
      loadMore: jest.fn(),
    };
    const props = {
      relay,
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    fireEvent.click(getByText('Load more'));

    expect(relay.hasMore).toHaveBeenCalled();
    expect(relay.loadMore).toHaveBeenCalledTimes(1);
  });

  it('should not call relay.loadMore while a request is still pending', () => {
    const relay: IRelay = {
      hasMore: jest.fn(() => true),
      isLoading: jest.fn(() => true),
      loadMore: jest.fn(),
    };
    const props = {
      relay,
      children: [
        <span key="1">list item</span>
      ]
    };
    const { getByText } = render(
      <List {...props} />
    );

    fireEvent.click(getByText('Load more'));

    expect(relay.hasMore).toHaveBeenCalled();
    expect(relay.isLoading).toHaveBeenCalled();
    expect(relay.loadMore).not.toHaveBeenCalled();
  });
});
