import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Label from 'components/Label/Label';
import PeopleIcon from 'components/Icons/People';
import PeopleList from 'pages/profile/components/List/PeopleList';
import QueryRendererTabList from 'pages/profile/components/QueryRendererTabList/QueryRendererTabList';
import RepositoriesList from 'pages/profile/components/List/RepositoriesList';
import RepositoryIcon from 'components/Icons/Repository';
import RepositoryItemSkeleton from 'pages/profile/components/Item/RepositoryItem.skeleton';
import UserItemSkeleton from 'pages/profile/components/Item/UserItem.skeleton';
import { useQueryString } from 'utils/hooks';



const tabs = ['repositories', 'people'];

const useStyles = makeStyles(theme => ({
  organizationNavigator: {
    flex: '1 1 auto',
    marginTop: '2rem',
  },
  tab: {
    textTransform: 'none',
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" hidden={value !== index} id={`tab-${index}`} {...other}>
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
      <Tab classes={overrides} label={<Label><PeopleIcon />People</Label>} />
    </Tabs>
  );
};
OrganizationTabs.propTypes = {
  handleTabChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

const OrganizationTabPanels = props => {
  const { profile, tabIndex, tabName } = props;

  return (
    <React.Fragment>
      { tabName === 'repositories' &&
        <TabPanel value={tabIndex} index={0}>
          <RepositoriesList owner={profile} />
        </TabPanel>
      }
      { tabName === 'people' &&
        <TabPanel value={tabIndex} index={1}>
          <PeopleList organization={profile} />
        </TabPanel>
      }
    </React.Fragment>
  );
};
OrganizationTabPanels.propTypes = {
  profile: PropTypes.shape({
    repositories: PropTypes.object,
    reople: PropTypes.object,
  }).isRequired,
  tabIndex: PropTypes.number.isRequired,
  tabName: PropTypes.oneOf(tabs).isRequired,
};

const OrganizationNavigator = props => {
  const { profile } = props;
  const classes = useStyles();
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab')));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const handleTabChange = (event, index) => {
    setSearch('tab', tabs[index]);
    setTabIndex(index);
  };

  const Content = props => {
    const { isLoading, profile } = props;
    const Skeleton = ['repositories', 'starredRepositories'].includes(tabName)
      ? () => <RepositoryItemSkeleton />
      : () => <UserItemSkeleton />;

    return (
      <div className={classes.root}>
        <OrganizationTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />
        { isLoading === true
          ? <TabPanel value={tabIndex} index={tabIndex}><Skeleton /></TabPanel>
          : <OrganizationTabPanels profile={profile} tabIndex={tabIndex} tabName={tabName} />
        }
      </div>
    );
  };

  return props.tabName === tabName
    ? <Content profile={profile} isLoading={false} />
    : <QueryRendererTabList tabName={tabName} Content={Content} />;
};
OrganizationNavigator.propTypes = {
  profile: PropTypes.shape({
    people: PropTypes.object,
    repositories: PropTypes.object,
  }).isRequired,
  tabName: PropTypes.string.isRequired,
};

export default OrganizationNavigator;
