import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem 0',
    borderTop: '1px solid #555555',
    marginTop: '1rem',
  },
  anchor: {
    margin: '0 0.5rem 0.5rem 0',
  }
}));

const OwnerList = props => {
  const { title, owners } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title component="h2" gutterBottom>{title}</Title>
      {owners.map(owner => {
        const localUrl = owner.url.replace(/https?:\/\/github\.com/, '');
        return (
          <Anchor className={classes.anchor} href={localUrl} key={owner.login} external>
            <Avatar
              alt={owner.name}
              imgProps={{ height: '32', width: '32' }}
              src={owner.avatarUrl}
              variant="rounded"
            />
          </Anchor>
        );
      })}
    </div>
  );
};

export default OwnerList;
