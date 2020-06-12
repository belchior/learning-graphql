import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from '../List/List';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import { connectionConfig, fragmentSpec } from './RepositoriesList.relay';
import { edgesToArray } from 'utils/array';


const RepositoriesList = (props) => {
  const { relay, owner } = props;
  const repositories = edgesToArray(owner.repositories || { edges: [] });

  return (
    <List relay={relay}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default createPaginationContainer(RepositoriesList, fragmentSpec, connectionConfig);
