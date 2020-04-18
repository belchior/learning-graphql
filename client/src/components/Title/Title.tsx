import React from 'react';
import Typography from '@material-ui/core/Typography';


interface IProps {
  children: React.ReactNode
  className?: string
  component?: string
  gutterBottom?: boolean
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title = (props: IProps) => {
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
