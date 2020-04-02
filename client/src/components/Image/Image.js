import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  img: {
    borderRadius: theme.shape.borderRadius,
  },
  fallback: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
  }
}));

const Fallback = props => {
  const { alt, className = '', width = 32, height = 32 } = props;
  const classes = useStyles();
  const classnames = `${classes.fallback} ${className}`;
  const maxLength = 200;
  const fontSize = Math.min(maxLength, Number(width), Number(height)) / 2;
  const styles = { width, height, fontSize };

  return <div className={classnames} style={styles}>{alt[0]}</div>;
};

const Image = props => {
  const { alt, className = '', fallback = <Fallback {...props} />, src, ...other } = props;
  const [error, setError] = React.useState(false);
  const classes = useStyles();
  const classnames = `${className} ${classes.img}`;
  const handleError = () => setError(prevState => !prevState);

  return error
    ? fallback
    : <img {...other} className={classnames} src={src} alt={alt} onError={handleError} />;
};
Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallback: PropTypes.node,
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default Image;
