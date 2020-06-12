import React from 'react';

import OrganizationHeader from 'pages/profile/components/OrganizationHeader/OrganizationHeader';
import OrganizationNavigator from 'pages/profile/components/OrganizationNavigator/OrganizationNavigator';
import { useStyles } from  './OrganizationProfile.styles';


const OrganizationProfile = (props) => {
  const { profile, tabName } = props;
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <OrganizationHeader profile={profile} />
      <OrganizationNavigator profile={profile} tabName={tabName} />
    </main>
  );
};

export default OrganizationProfile;
