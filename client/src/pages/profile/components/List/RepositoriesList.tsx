import React from 'react';

import List from './List';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import { IRepositoryOwner } from 'utils/interfaces';
import { edgesToArray } from 'utils/array';


interface IProps {
  owner: IRepositoryOwner
}

const RepositoriesList = (props: IProps) => {
  const { owner } = props;
  const repositories = edgesToArray(owner.repositories || { edges: [] });

  return (
    <List>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default RepositoriesList;
