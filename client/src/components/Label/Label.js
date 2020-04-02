import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    display: 'inline-flex',
    '& svg:first-of-type': {
      marginRight: '0.4rem',
      alignSelf: 'center',
    },
    '& svg:last-of-type:not(:first-of-type)': {
      marginLeft: '0.4rem',
      alignSelf: 'center',
    }
  }
}));

const Label = props => {
  const { children, className = '', ...typographyProps } = props;
  const classes = useStyles();
  const classNames = `${classes.label} ${className}`;

  return (
    <Typography className={classNames} {...typographyProps}>{children}</Typography>
  );
};
Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
