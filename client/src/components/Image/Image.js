import React from 'react';

import { useStyles } from './Image.styles';


export const Fallback = (props) => {
  const { alt, className = '', width = 32, height = 32 } = props;
  const classes = useStyles();
  const classnames = `${classes.fallback} ${className}`;
  const maxLength = 200;
  const fontSize = Math.min(maxLength, Number(width), Number(height)) / 2;
  const styles = { width, height, fontSize };

  return <div className={classnames} style={styles}>{alt[0]}</div>;
};

const Image = (props) => {
  const { alt, className = '', fallback = <Fallback {...props} />, src, ...other } = props;
  const [error, setError] = React.useState(false);
  const classes = useStyles();
  const classnames = `${className} ${classes.img}`;
  const handleError = () => setError(prevState => true);

  return error
    ? fallback
    : <img {...other} className={classnames} src={src} alt={alt} onError={handleError} />;
};

export default Image;
