import React from 'react';
import { QueryRenderer } from 'react-relay';


export const TestRenderer = (props) => {
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
