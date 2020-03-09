import React, { useContext, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import RepositoryItem from '../List/RepositoryItem';
import UserItem from '../List/UserItem';
import { GlobalContext } from 'components/App/App';
import { edgesToArray } from 'utils/array';
import { useQueryString } from 'utils/hooks';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
}));

const tabs = ['repositories', 'stars', 'followers', 'following'];

const Navigator = props => {
  const classes = useStyles();
  const user = useContext(GlobalContext);
  const repositories = edgesToArray(user.repositories);
  const starredRepositories = edgesToArray(user.starredRepositories);
  const followers = edgesToArray(user.followers);
  const following = edgesToArray(user.following);

  const [search, setSearch] = useQueryString();
  const tab = search.get('tab') || tabs[0];
  const [tabIndex, setTabIndex] = useState(tabs.indexOf(tab));

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
      <TabPanel value={tabIndex} index={0}>
        {repositories.map(repo => (
          <RepositoryItem repository={repo} key={repo.name} />
        ))}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {starredRepositories.map(repo => (
          <RepositoryItem repository={repo} key={repo.name} />
        ))}
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        {followers.map(user => (
          <UserItem user={user} key={user.name} />
        ))}
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        {following.map(user => (
          <UserItem user={user} key={user.name} />
        ))}
      </TabPanel>
    </div>
  );
};

export default Navigator;


function TabPanel(props) {
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
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}