import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    fontSize: '2rem',
  }
}));

const NotFound = props => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Title className={classes.title} variant="h1">404 - Not found</Title>
      <Typography>
        This is not the web page you are looking for.
      </Typography>
    </main>
  );
};

export default NotFound;
