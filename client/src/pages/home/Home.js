import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Title from 'components/Title/Title';
import Typography from '@material-ui/core/Typography';
import Anchor from 'components/Anchor/Anchor';


const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
  }
}));

const Home = props => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Title className={classes.title} variant="h1">
        Hi <span role="img" aria-label="hi">👋</span> friend!
      </Title>
      <Typography>
        This app will be better if you choose an user.
        Try <Anchor href="/belchior">belchior</Anchor>
      </Typography>
    </main>
  );
};

export default Home;
