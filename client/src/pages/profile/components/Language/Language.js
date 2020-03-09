import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  circle: {
    borderRadius: '50%',
    display: 'inline-block',
    height: '0.7rem',
    marginRight: '0.4rem',
    width: '0.7rem',
  }
}));

const Language = props => {
  const { children, color } = props;
  const classes = useStyles();
  return (
    <Typography className={classes.root} component="span">
      <span className={classes.circle} style={{ backgroundColor: color }} />
      <span>{children}</span>
    </Typography>
  );
};

export default Language;