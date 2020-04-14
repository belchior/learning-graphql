import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  userSidebar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '2rem 0',
    '&:last-child': {
      borderBottom: 0,
    }
  },
  skeleton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  repoName: {
    height: '25px',
    width: '150px',
  },
  description: {
    height: '15px',
    width: '250px',
    margin: '0.5rem 0 1rem 0',
  },
  labels: {
    height: '15px',
    width: '150px',
  },
}));

const UserSidebarSkeleton = props => {
  const classes = useStyles();
  return (
    <div className={classes.userSidebar}>
      <Skeleton className={`${classes.skeleton} ${classes.avatar}`} variant="rect" />
      <Skeleton className={`${classes.skeleton} ${classes.name}`} variant="text" />
      <Skeleton className={`${classes.skeleton} ${classes.login}`} variant="text" />
      <Skeleton className={`${classes.skeleton} ${classes.link}`} variant="text" />
    </div>
  );
};

export default UserSidebarSkeleton;
