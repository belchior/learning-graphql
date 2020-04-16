import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import OrganizationHeader from 'pages/profile/components/OrganizationHeader/OrganizationHeader';
import OrganizationNavigator from 'pages/profile/components/OrganizationNavigator/OrganizationNavigator';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '980px',
    margin: '0 auto',
    flexDirection: 'column',
  },
}));


const OrganizationProfile = props => {
  const { profile } = props;
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <OrganizationHeader profile={profile} />
      <OrganizationNavigator profile={profile} />
    </main>
  );
};

export default OrganizationProfile;
