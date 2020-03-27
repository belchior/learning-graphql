import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createPaginationContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import Anchor from 'components/Anchor/Anchor';
import EmailIcon from 'components/Icons/Email';
import LinkIcon from 'components/Icons/Link';
import Title from 'components/Title/Title';
import OwnerList from './components/OwnerList/OwnerList';
import { edgesToArray } from 'utils/array';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 18rem',
    marginRight: '3rem',
  },
  avatar: {
    maxWidth: '100%',
    borderRadius: '6px',
  },
  vcard: {
    padding: '1rem 0',
  },
  name: {
    fontSize: '1.625rem',
    fontWeight: '600',
  },
  login: {
    fontSize: '1.25rem',
    fontWeight: '300',
    color: '#666',
  },
  bio: {
    marginBottom: '1rem',
  },
}));

const Sidebar = props => {
  const classes = useStyles();
  const { user } = props;

  const organizations = edgesToArray(user.organizations);
  return (
    <div className={classes.root}>
      <img className={classes.avatar} src={user.avatarUrl} alt={user.name} width="288" height="288" />
      <Title className={classes.vcard} variant="h1">
        <Typography className={classes.name}>{user.name}</Typography>
        <Typography className={classes.login}>{user.login}</Typography>
      </Title>
      <Typography className={classes.bio} variant="body2">{user.bio}</Typography>
      <Anchor href={`mailto:${user.email}`} variant="body2">
        <EmailIcon />
        <span>{user.email}</span>
      </Anchor>
      <Anchor href={user.websiteUrl} variant="body2">
        <LinkIcon />
        {user.websiteUrl}
      </Anchor>

      { organizations.length > 0 && <OwnerList title="Organizations" owners={organizations} /> }
    </div>
  );
};

export default createPaginationContainer(
  Sidebar,
  {
    user: graphql`
      fragment Sidebar_user on User @argumentDefinitions(cursor: { type: "String" }) {
        avatarUrl
        name
        bio
        login
        email
        websiteUrl
        organizations(first: 10 after: $cursor) @connection(key: "Sidebar_organizations") {
          edges {
            node {
              id
              login
              name
              avatarUrl
              url
            }
          }
        }
      }
    `
  },
  {
    getFragmentVariables: (prevVars, cursor) => ({
      ...prevVars,
      cursor: cursor,
    }),
  }
);
