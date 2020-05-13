import React from 'react';
import { QueryRenderer, GraphQLTaggedNode } from 'react-relay';
import { RelayMockEnvironment } from 'relay-test-utils';


interface IProps {
  Component: Function,
  acceptsLoadingState?: boolean,
  environment: RelayMockEnvironment,
  query: GraphQLTaggedNode,
  variables: { [key: string]: any }
}
export const TestRenderer = (props: IProps) => {
  const { Component, acceptsLoadingState = false, environment, query, variables } = props;
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>Error!</div>;
        if (!props) return (
          acceptsLoadingState
            ? <Component {...props} isLoading={true} />
            : <div>loading...</div>
        );
        return <Component {...props} />;
      }}
    />
  );
};
