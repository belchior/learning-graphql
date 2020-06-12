import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import { useStyles } from './Anchor.styles';


const Anchor = (props) => {
  const { children, className = '', href, external = false, decoration = 'primary', ...other } = props;
  const classes = useStyles();
  const classNames = `${classes.root} ${classes[decoration]} ${className}`;

  return (
    <MuiLink
      to={external ? undefined : href}
      href={external ? href : undefined}
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
