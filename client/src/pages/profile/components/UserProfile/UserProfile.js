import React from 'react';

import UserNavigator from 'pages/profile/components/UserNavigator/UserNavigator.container';
import Sidebar from 'pages/profile/components/UserSidebar/UserSidebar';

const UserProfile = props => {
  const { profile } = props;

  return (
    <main>
      <Sidebar profile={profile} />
      <UserNavigator />
    </main>
  );
};

export default UserProfile;

