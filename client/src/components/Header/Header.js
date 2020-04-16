import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import GithubIcon from 'components/Icons/Github';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '2rem',
    padding: '1rem',
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Anchor href="/"><GithubIcon /></Anchor>
      </Container>
    </div>
  );
};

export default Header;
