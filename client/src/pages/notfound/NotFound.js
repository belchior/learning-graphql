import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Sidebar from 'components/Sidebar/Sidebar';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const NotFound = props => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Sidebar />
      <Title variant="h1">404 - Not found</Title>
    </main>
  );
};

export default NotFound;