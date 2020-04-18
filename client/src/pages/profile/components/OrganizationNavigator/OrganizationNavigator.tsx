import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import Label from 'components/Label/Label';
import PeopleIcon from 'components/Icons/People';
import PeopleList from 'pages/profile/components/List/PeopleList';
import QueryRendererTabList from 'pages/profile/components/QueryRendererTabList/QueryRendererTabList';
import RepositoriesList from 'pages/profile/components/List/RepositoriesList';
import RepositoryIcon from 'components/Icons/Repository';
import RepositoryItemSkeleton from 'pages/profile/components/Item/RepositoryItem.skeleton';
import UserItemSkeleton from 'pages/profile/components/Item/UserItem.skeleton';
import { IOrganization, TEventFn, TOrganizationTabs } from 'utils/interfaces';
import { useQueryString } from 'utils/hooks';
import { useStyles } from './OrganizationNavigator.styles';


interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}
interface OrganizationTabsProps {
  handleTabChange: TEventFn
  tabIndex: number
}
interface OrganizationTabPanelsProps {
  profile: IOrganization
  tabIndex: number
  tabName: TOrganizationTabs
}
interface OrganizationNavigatorProps {
  profile: IOrganization
  tabName: string
}
interface ContentProps {
  profile: IOrganization
  isLoading: boolean
}

const tabs: TOrganizationTabs[] = ['repositories', 'people'];

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" hidden={value !== index} id={`tab-${index}`} {...other}>
      {value === index && children}
    </Typography>
  );
};


const OrganizationTabs = (props: OrganizationTabsProps) => {
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


const OrganizationTabPanels = (props: OrganizationTabPanelsProps) => {
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


const OrganizationNavigator = (props: OrganizationNavigatorProps) => {
  const { profile } = props;
  const [search, setSearch] = useQueryString();
  const initialTabIndex = Math.max(0, tabs.indexOf(search.get('tab') as TOrganizationTabs));
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);
  const tabName = tabs[tabIndex];
  const handleTabChange: TEventFn = (event, index) => {
    setSearch('tab', tabs[index]);
    setTabIndex(index);
  };

  const Content = (props: ContentProps) => {
    const { isLoading, profile } = props;
    const Skeleton = ['repositories', 'starredRepositories'].includes(tabName)
      ? () => <RepositoryItemSkeleton />
      : () => <UserItemSkeleton />;

    return (
      <div>
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

export default OrganizationNavigator;
