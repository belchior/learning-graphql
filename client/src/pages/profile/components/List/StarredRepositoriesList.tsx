import React from 'react';

import List from './List';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import { IUser } from 'utils/interfaces';
import { edgesToArray } from 'utils/array';


interface IProps {
  user: IUser
}

const StarredRepositoriesList = (props: IProps) => {
  const { user } = props;
  const repositories = edgesToArray(user.starredRepositories || { edges: [] });

  return (
    <List>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default StarredRepositoriesList;
