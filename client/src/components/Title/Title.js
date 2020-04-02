import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


const Title = props => {
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
Title.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

export default Title;
