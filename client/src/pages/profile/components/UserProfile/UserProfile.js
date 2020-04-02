import React from 'react';

import Navigator from 'pages/profile/components/UserNavigator/UserNavigator';
import Sidebar from 'pages/profile/components/UserSidebar/UserSidebar';

const UserProfile = props => {
  const { profile } = props;

  return (
    <main>
      <Sidebar profile={profile} />
      <Navigator />
    </main>
  );
};

export default UserProfile;

