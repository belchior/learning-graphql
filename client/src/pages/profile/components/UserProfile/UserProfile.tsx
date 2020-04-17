import React from 'react';

import UserNavigator from 'pages/profile/components/UserNavigator/UserNavigator';
import Sidebar from 'pages/profile/components/UserSidebar/UserSidebar';
import { IUser, TUserTabs } from 'utils/interfaces';


interface IProps {
  profile: IUser
  tabName: TUserTabs
}

const UserProfile = (props: IProps) => {
  const { profile, tabName } = props;

  return (
    <main>
      <Sidebar profile={profile} />
      <UserNavigator profile={profile} tabName={tabName} />
    </main>
  );
};

export default UserProfile;

