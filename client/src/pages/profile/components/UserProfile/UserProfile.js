import React from 'react';

import UserNavigator from 'pages/profile/components/UserNavigator/UserNavigator';
import Sidebar from 'pages/profile/components/UserSidebar/UserSidebar';


const UserProfile = (props) => {
  const { profile, tabName } = props;

  return (
    <main>
      <Sidebar profile={profile} />
      <UserNavigator profile={profile} tabName={tabName} />
    </main>
  );
};

export default UserProfile;

