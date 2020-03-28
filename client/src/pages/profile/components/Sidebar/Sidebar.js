import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import EmailIcon from 'components/Icons/Email';
import LinkIcon from 'components/Icons/Link';
import OwnerList from './components/OwnerList';
import Title from 'components/Title/Title';
import { edgesToArray } from 'utils/array';


const useStyles = makeStyles(theme => ({
  root: {
    flex: '0 0 18rem',
    marginRight: '3rem',
  },
  avatar: {
    maxWidth: '100%',
    borderRadius: '6px',
    width: 'inherit',
    height: 'inherit',
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
      <Avatar
        alt={user.name}
        className={classes.avatar}
        imgProps={{ height: '288', width: '288' }}
        src={user.avatarUrl}
        variant="rounded"
      />
      <Title className={classes.vcard} variant="h1">
        <Typography className={classes.name}>{user.name}</Typography>
        <Typography className={classes.login}>{user.login}</Typography>
      </Title>
      <Typography className={classes.bio} variant="body2">{user.bio}</Typography>
      <Anchor href={`mailto:${user.email}`} external>
        <EmailIcon />
        <span>{user.email}</span>
      </Anchor>
      { user.websiteUrl &&
        <Anchor href={user.websiteUrl} external>
          <LinkIcon />
          {user.websiteUrl}
        </Anchor>
      }

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
