import React from 'react';
import { QueryHookOptions, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { query } from './QueryRendererTabList.gql';


interface IProps {
  Content: Function
  tabName: string
}

const QueryRendererTabList = (props: IProps) => {
  const { Content, tabName } = props;
  const params = useParams<{ login: string }>();
  const options: QueryHookOptions = {
    variables: {
      followers: tabName === 'followers',
      following: tabName === 'following',
      login: params.login,
      people: tabName === 'people',
      repositories: tabName === 'repositories',
      starredRepositories: tabName === 'starredRepositories',
    },
    fetchPolicy: 'no-cache'
  };
  const { loading, error, data } = useQuery(query, options);

  if (error) return <div>Error!</div>;
  if (loading) return <Content {...data} isLoading />;
  return <Content {...data} isLoading={false} />;
};

export default QueryRendererTabList;
