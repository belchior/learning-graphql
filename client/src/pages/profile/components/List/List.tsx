import React from 'react';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './List.styles';


interface IProps {
  children: React.ReactNode
}

const List = (props: IProps) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.list}>
      { Array.isArray(children) && children.length === 0
        ? <Typography className={classes.empty}>There is no item to show</Typography>
        : (
          <React.Fragment>
            {children}
          </React.Fragment>
        )
      }
    </div>
  );
};

export default List;
