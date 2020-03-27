import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import RepositoryItem from '../List/RepositoryItem';
import UserItem from '../List/UserItem';
import { edgesToArray } from 'utils/array';
import { useQueryString } from 'utils/hooks';
import { environment } from 'utils/environment';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
}));

const tabs = ['repositories', 'starredRepositories', 'followers', 'following'];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});


const NavigatorView = props => {
  const classes = useStyles();
  const { user } = props;
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const items = edgesToArray(user[tabName]);

  const handleTabChange = (event, index) => {
    setTabIndex(index);
    setSearch('tab', tabs[index]);
  };

  return (
    <div className={classes.root}>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Repositories" {...a11yProps(0)} />
        <Tab label="Stars" {...a11yProps(1)} />
        <Tab label="Followers" {...a11yProps(2)} />
        <Tab label="Following" {...a11yProps(3)} />
      </Tabs>
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
    </div>
  );
};

const Navigator = props => {
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
    query NavigatorQuery(
      $login: String!
      $repositories: Boolean!
      $starredRepositories: Boolean!
      $followers: Boolean!
      $following: Boolean!
    ) {
      user(login: $login) {
        repositories(first: 5) @include(if: $repositories) {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
        starredRepositories(first: 5) @include(if: $starredRepositories) {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
        followers(first: 5) @include(if: $followers) {
          edges {
            node {
              id
              ...UserItem_user
            }
          }
        }
        following(first: 5) @include(if: $following) {
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
        if (!props) return <div>loading...</div>;
        return <NavigatorView {...props} />;
      }}
    />
  );
};

export default Navigator;
