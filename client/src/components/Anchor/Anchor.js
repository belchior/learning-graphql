import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    textDecoration: 'none',
    '& svg:first-of-type': {
      marginRight: '0.4rem',
    },
    '& svg:last-of-type:not(:first-of-type)': {
      marginLeft: '0.4rem',
    }
  },
  primary: {
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  secondary: {
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    }
  },
  contained: {
    backgroundColor: '#f1f8ff',
    borderRadius: '3px',
    color: theme.palette.primary.main,
    fontSize: '12px',
    margin: '4px 6px',
    marginLeft: 0,
    padding: '0.2rem 0.6rem',
    textTransform: 'lowercase',
    '&:hover': {
      backgroundColor: '#def',
      textDecoration: 'none',
    }
  }
}));

const Anchor = props => {
  const { children, className = '', href, external = false, decoration = 'primary', ...other } = props;
  const classes = useStyles();
  const classNames = `${classes.root} ${classes[decoration]} ${className}`;

  return (
    <MuiLink
      to={external ? null : href}
      href={external ? href : null}
      component={external ? 'a' : Link}
      className={classNames}
      variant="inherit"
      {...other}
    >
      {children}
    </MuiLink>
  );
};

export default Anchor;
