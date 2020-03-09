import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem 0',
    borderTop: '1px solid #555555',
    marginTop: '1rem',
  },
}));

const UserList = props => {
  const { title, users } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title component="h2" gutterBottom>{title}</Title>
      {users.map(org => (
        <a href={org.url} key={org.login}>
          <img src={org.avatarUrl} alt={org.name} width="32" height="32" />
        </a>
      ))}
    </div>
  );
};

export default UserList;