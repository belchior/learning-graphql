import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from 'components/Sidebar/Sidebar';
import Navigator from './components/Navigator/Navigator';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const Profile = props => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Sidebar />
      <Navigator />
    </main>
  );
};

export default Profile;