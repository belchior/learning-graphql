import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import FollowersList from 'pages/profile/components/FollowersList/FollowersList';
import FollowingList from 'pages/profile/components/FollowingList/FollowingList';
import Label from 'components/Label/Label';
import PeopleIcon from 'components/Icons/People';
import QueryRendererTabList from 'pages/profile/components/QueryRendererTabList/QueryRendererTabList';
import RepositoriesList from 'pages/profile/components/RepositoriesList/RepositoriesList';
import RepositoryIcon from 'components/Icons/Repository';
import RepositoryItemSkeleton from 'pages/profile/components/RepositoryItem/RepositoryItem.skeleton';
import StarredRepositoriesList from 'pages/profile/components/StarredRepositoriesList/StarredRepositoriesList';
import UserItemSkeleton from 'pages/profile/components/UserItem/UserItem.skeleton';
import { TEventFn, IUser, TUserTabs } from 'utils/interfaces';
import { useQueryString } from 'utils/hooks';
import { useStyles } from './UserNavigator.styles';


interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface UserTabsProps {
  handleTabChange: TEventFn
  tabIndex: number
}
interface UserTabPanelsProps {
  profile: IUser
  tabIndex: number
  tabName: TUserTabs
}
interface UserNavigatorProps {
  profile: IUser
  tabName: TUserTabs
}
interface IContentProps {
  isLoading: boolean
  profile: IUser
}

const tabs: TUserTabs[] = ['repositories', 'starredRepositories', 'followers', 'following'];

const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <Typography component="div" hidden={value !== index} id={`tab-${index}`} {...other}>
      {value === index && children}
    </Typography>
  );
};

const UserTabs = (props: UserTabsProps) => {
  const { tabIndex, handleTabChange } = props;
  const classes = useStyles();
  const overrides = {
    root: classes.tab,
  };
  return (
    <Tabs value={tabIndex} onChange={handleTabChange}>
      <Tab classes={overrides} label={<Label><RepositoryIcon />Repositories</Label>} />
      <Tab classes={overrides} label={<Label><RepositoryIcon />Stars</Label>} />
      <Tab classes={overrides} label={<Label><PeopleIcon />Followers</Label>} />
      <Tab classes={overrides} label={<Label><PeopleIcon />Following</Label>} />
    </Tabs>
  );
};

const UserTabPanels = (props: UserTabPanelsProps) => {
  const { profile, tabIndex, tabName } = props;

  return (
    <React.Fragment>
      { tabName === 'repositories' &&
        <TabPanel value={tabIndex} index={0}>
          <RepositoriesList owner={profile} />
        </TabPanel>
      }
      { tabName === 'starredRepositories' &&
        <TabPanel value={tabIndex} index={1}>
          <StarredRepositoriesList user={profile} />
        </TabPanel>
      }
      { tabName === 'followers' &&
        <TabPanel value={tabIndex} index={2}>
          <FollowersList user={profile} />
        </TabPanel>
      }
      { tabName === 'following' &&
        <TabPanel value={tabIndex} index={3}>
          <FollowingList user={profile} />
        </TabPanel>
      }
    </React.Fragment>
  );
};

const UserNavigator = (props: UserNavigatorProps) => {
  const { profile } = props;
  const classes = useStyles();
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab') as TUserTabs));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const handleTabChange: TEventFn = (event, index) => {
    setSearch('tab', tabs[index]);
    setTabIndex(index);
  };

  const Content = (props: IContentProps) => {
    const { isLoading, profile } = props;
    const Skeleton = ['repositories', 'starredRepositories'].includes(tabName)
      ? () => <RepositoryItemSkeleton />
      : () => <UserItemSkeleton />;

    return (
      <div className={classes.root}>
        <UserTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />
        { isLoading === true
          ? <TabPanel value={tabIndex} index={tabIndex}><Skeleton /></TabPanel>
          : <UserTabPanels profile={profile} tabIndex={tabIndex} tabName={tabName} />
        }
      </div>
    );
  };

  return props.tabName === tabName
    ? <Content profile={profile} isLoading={false} />
    : <QueryRendererTabList tabName={tabName} Content={Content} />;
};

export default UserNavigator;
