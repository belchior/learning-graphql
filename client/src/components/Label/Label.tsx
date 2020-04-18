import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Label.styles';


interface IProps extends React.ComponentProps<typeof Typography> {
  children: React.ReactNode
  className?: string
}

const Label = (props: IProps) => {
  const { children, className = '', ...typographyProps } = props;
  const classes = useStyles();
  const classNames = `${classes.label} ${className}`;

  return (
    <Typography className={classNames} {...typographyProps}>{children}</Typography>
  );
};

export default Label;
