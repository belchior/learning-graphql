import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FollowersList from '../List/FollowersList';
import FollowingList from '../List/FollowingList';
import Label from 'components/Label/Label';
import PeopleIcon from 'components/Icons/People';
import RepositoriesList from '../List/RepositoriesList';
import RepositoryIcon from 'components/Icons/Repository';
import RepositoryItemSkeleton from 'pages/profile/components/Item/RepositoryItem.skeleton';
import StarredRepositoriesList from '../List/StarredRepositoriesList';
import UserItemSkeleton from 'pages/profile/components/Item/UserItem.skeleton';
import { tabs } from './common';
import { useQueryString } from 'utils/hooks';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
  tab: {
    textTransform: 'none',
  },
  actionContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  }
}));

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      hidden={value !== index}
      id={`tab-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && children}
    </Typography>
  );
};

const UserTabs = props => {
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

const UserTabPanels = props => {
  const { user, tabIndex, tabName } = props;
  return (
    <React.Fragment>
      { tabName === 'repositories' &&
        <TabPanel value={tabIndex} index={0}>
          <RepositoriesList user={user} />
        </TabPanel>
      }
      { tabName === 'starredRepositories' &&
        <TabPanel value={tabIndex} index={1}>
          <StarredRepositoriesList user={user} />
        </TabPanel>
      }
      { tabName === 'followers' &&
        <TabPanel value={tabIndex} index={2}>
          <FollowersList user={user} />
        </TabPanel>
      }
      { tabName === 'following' &&
        <TabPanel value={tabIndex} index={3}>
          <FollowingList user={user} />
        </TabPanel>
      }
    </React.Fragment>
  );
};

const UserNavigatorView = props => {
  const { isLoading, user } = props;
  const classes = useStyles();
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const handleTabChange = (event, index) => {
    setTabIndex(index);
    setSearch('tab', tabs[index]);
  };


  return (
    <div className={classes.root}>
      <UserTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />
      { isLoading === true &&
        <TabPanel value={tabIndex} index={tabIndex}>
          { ['repositories', 'starredRepositories'].includes(tabName)
            ? <RepositoryItemSkeleton />
            : <UserItemSkeleton />
          }
        </TabPanel>
      }
      { isLoading === false &&
        <UserTabPanels user={user} tabIndex={tabIndex} tabName={tabName} />
      }
    </div>
  );
};

export default UserNavigatorView;
