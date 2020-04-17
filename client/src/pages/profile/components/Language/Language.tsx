import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Language.styles';


interface ILanguage {
  color: string
  children: React.ReactNode
}

const Language = (props: ILanguage) => {
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
