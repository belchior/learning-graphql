import React from 'react';
import { createPaginationContainer } from 'react-relay';

import List from '../List/List';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import { IRelay, IUser } from 'utils/interfaces';
import { connectionConfig, fragmentSpec } from './StarredRepositoriesList.relay';
import { edgesToArray } from 'utils/array';


interface IProps {
  relay: IRelay
  user: IUser
}

const StarredRepositoriesList = (props: IProps) => {
  const { relay, user } = props;
  const repositories = edgesToArray(user.starredRepositories || { edges: [] });

  return (
    <List relay={relay}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default createPaginationContainer(StarredRepositoriesList, fragmentSpec, connectionConfig);
