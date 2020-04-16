import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Anchor from 'components/Anchor/Anchor';


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: 'rgb(39, 44, 49)',
    bottom: '0',
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '1rem',
    position: 'fixed',
    textAlign: 'center',
    width: '100%',
    zIndex: theme.zIndex.appBar,
  },
  text: {
    fontSize: '0.8rem',
  }
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Container maxWidth="xl">
        <Typography className={classes.text}>
          This app is part of the project <Anchor href="https://github.com/belchior/learning-graphql" external>
          Learning GraphQL</Anchor> made by <Anchor href="https://github.com/belchior">Belchior Oliveira</Anchor>
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
