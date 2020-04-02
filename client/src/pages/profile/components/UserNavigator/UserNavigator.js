import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Label from 'components/Label/Label';
import PeopleIcon from 'components/Icons/People';
import RepositoryIcon from 'components/Icons/Repository';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import RepositoryItemSkeleton from 'pages/profile/components/RepositoryItem/RepositoryItem.skeleton';
import UserItem from 'pages/profile/components/UserItem/UserItem';
import UserItemSkeleton from 'pages/profile/components/UserItem/UserItem.skeleton';
import { edgesToArray } from 'utils/array';
import { environment } from 'utils/environment';
import { useQueryString } from 'utils/hooks';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
  tab: {
    textTransform: 'none',
  }
}));

const tabs = ['repositories', 'starredRepositories', 'followers', 'following'];

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
  const { isLoading, items, tabIndex, tabName } = props;

  if (isLoading) {
    return (
      <TabPanel value={tabIndex} index={tabIndex}>
        { ['repositories', 'starredRepositories'].indexOf(tabName) >= 0
          ? <RepositoryItemSkeleton />
          : <UserItemSkeleton />
        }
      </TabPanel>
    );
  }
  if (items.length === 0) {
    return (
      <TabPanel value={tabIndex} index={tabIndex}>
        <div style={{ padding: '2rem 0' }}>There is no item to show</div>
      </TabPanel>
    );
  }
  return (
    <React.Fragment>
      { tabName === 'repositories' &&
        <TabPanel value={tabIndex} index={0}>
          {items.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
        </TabPanel>
      }
      { tabName === 'starredRepositories' &&
        <TabPanel value={tabIndex} index={1}>
          {items.map(repo => <RepositoryItem repository={repo} key={repo.id} />)}
        </TabPanel>
      }
      { tabName === 'followers' &&
        <TabPanel value={tabIndex} index={2}>
          {items.map(user => <UserItem user={user} key={user.id} />)}
        </TabPanel>
      }
      { tabName === 'following' &&
        <TabPanel value={tabIndex} index={3}>
          {items.map(user => <UserItem user={user} key={user.id} />)}
        </TabPanel>
      }
    </React.Fragment>
  );
};

const NavigatorView = props => {
  const classes = useStyles();
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const { isLoading, user } = props;
  const items = isLoading === false
    ? edgesToArray(user[tabName])
    : [];

  const handleTabChange = (event, index) => {
    setTabIndex(index);
    setSearch('tab', tabs[index]);
  };

  return (
    <div className={classes.root}>
      <UserTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />
      <UserTabPanels isLoading={isLoading} items={items} tabIndex={tabIndex} tabName={tabName} />
    </div>
  );
};

const UserNavigator = props => {
  const params = useParams();
  const [search] = useQueryString();
  const tabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const tabName = tabs[tabIndex];
  const variables = {
    login: params.login,
    repositories: tabName === 'repositories',
    starredRepositories: tabName === 'starredRepositories',
    followers: tabName === 'followers',
    following: tabName === 'following',
  };
  const query = graphql`
    query UserNavigatorQuery(
      $login: String!
      $repositories: Boolean!
      $starredRepositories: Boolean!
      $followers: Boolean!
      $following: Boolean!
    ) {
      user(login: $login) {
        repositories(last: 20) @include(if: $repositories) {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
        starredRepositories(last: 20) @include(if: $starredRepositories) {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
        followers(last: 20) @include(if: $followers) {
          edges {
            node {
              id
              ...UserItem_user
            }
          }
        }
        following(last: 20) @include(if: $following) {
          edges {
            node {
              id
              ...UserItem_user
            }
          }
        }
      }
    }
  `;

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>Error!</div>;
        if (!props) return <NavigatorView {...props} isLoading />;
        return <NavigatorView {...props} isLoading={false}  />;
      }}
    />
  );
};

export default UserNavigator;
