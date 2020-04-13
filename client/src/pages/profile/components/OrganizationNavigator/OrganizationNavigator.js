import React from 'react';
import PropTypes from 'prop-types';
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
import RepositoryItem from '../Item/RepositoryItem';
import RepositoryItemSkeleton from 'pages/profile/components/Item/RepositoryItem.skeleton';
import UserItem from 'pages/profile/components/Item/UserItem';
import UserItemSkeleton from 'pages/profile/components/Item/UserItem.skeleton';
import { edgesToArray } from 'utils/array';
import { environment } from 'utils/environment';
import { useQueryString } from 'utils/hooks';


const useStyles = makeStyles(theme => ({
  organizationNavigator: {
    flex: '1 1 auto',
    marginTop: '2rem',
  },
  tab: {
    textTransform: 'none',
  }
}));

const tabs = ['repositories', 'people'];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const OrganizationTabs = props => {
  const { tabIndex, handleTabChange } = props;
  const classes = useStyles();
  const overrides = {
    root: classes.tab,
  };
  return (
    <Tabs value={tabIndex} onChange={handleTabChange}>
      <Tab classes={overrides} label={<Label><RepositoryIcon />Repositories</Label>} />
      <Tab classes={overrides}label={<Label><PeopleIcon />People</Label>} />
    </Tabs>
  );
};

const OrganizationTabPanels = props => {
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
      { tabName === 'people' &&
        <TabPanel value={tabIndex} index={1}>
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
  const { isLoading, organization } = props;
  const items = isLoading === false
    ? edgesToArray(organization[tabName])
    : [];

  const handleTabChange = (event, index) => {
    setTabIndex(index);
    setSearch('tab', tabs[index]);
  };

  return (
    <div className={classes.organizationNavigator}>
      <OrganizationTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />
      <OrganizationTabPanels isLoading={isLoading} items={items} tabIndex={tabIndex} tabName={tabName} />
    </div>
  );
};
NavigatorView.propTypes = {
  organization: PropTypes.shape({
    people: PropTypes.object,
    repositories: PropTypes.object,
  }),
};

const OrganizationNavigator = props => {
  const params = useParams();
  const [search] = useQueryString();
  const tabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const tabName = tabs[tabIndex];
  const variables = {
    login: params.login,
    repositories: tabName === 'repositories',
    people: tabName === 'people',
  };
  const query = graphql`
    query OrganizationNavigatorQuery(
      $login: String!
      $repositories: Boolean!
      $people: Boolean!
    ) {
      organization(login: $login) {
        repositories(last: 20) @include(if: $repositories) {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
        people(last: 20) @include(if: $people) {
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
        return <NavigatorView {...props} isLoading={false} />;
      }}
    />
  );
};

export default OrganizationNavigator;
