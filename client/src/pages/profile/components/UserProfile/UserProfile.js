import React from 'react';

import UserNavigator from 'pages/profile/components/UserNavigator/UserNavigator';
import Sidebar from 'pages/profile/components/UserSidebar/UserSidebar';

const UserProfile = props => {
  const { profile } = props;

  return (
    <main>
      <Sidebar profile={profile} />
      <UserNavigator profile={profile} tabName={props.tabName} />
    </main>
  );
};

export default UserProfile;

