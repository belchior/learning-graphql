import React from 'react';
import Typography from '@material-ui/core/Typography';


const Title = props => {
  const { children, ...typographyProps } = props;
  return (
    <Typography {...typographyProps}>{children}</Typography>
  );
};

export default Title;