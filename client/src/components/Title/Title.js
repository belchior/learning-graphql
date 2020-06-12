import React from 'react';
import Typography from '@material-ui/core/Typography';


const Title = (props) => {
  const { children, variant = 'h1', ...typographyProps } = props;

  return (
    <Typography
      {...typographyProps}
      variant={variant}
    >
      {children}
    </Typography>
  );
};

export default Title;
