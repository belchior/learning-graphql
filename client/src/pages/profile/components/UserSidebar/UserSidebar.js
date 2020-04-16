import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import EmailIcon from 'components/Icons/Email';
import Image from 'components/Image/Image';
import LinkIcon from 'components/Icons/Link';
import OwnerList from '../OwnerList/OwnerList';
import Title from 'components/Title/Title';
import { edgesToArray } from 'utils/array';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 18rem',
    marginRight: '3rem',
  },
  avatar: {
    borderRadius: '6px',
    maxWidth: '100%',
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

const UserSidebar = props => {
  const classes = useStyles();
  const { profile } = props;

  const organizations = edgesToArray(profile.organizations);
  return (
    <div className={classes.root}>
      <Image
        alt={profile.name}
        className={classes.avatar}
        height={288}
        src={profile.avatarUrl}
        width={288}
      />
      <Title className={classes.vcard} variant="h1">
        { profile.name && <Typography className={classes.name}>{profile.name}</Typography> }
        <Typography className={classes.login}>{profile.login}</Typography>
      </Title>
      { profile.bio &&
        <Typography className={classes.bio} variant="body2">{profile.bio}</Typography>
      }
      { profile.email &&
        <Anchor href={`mailto:${profile.email}`} external>
          <EmailIcon />
          <span>{profile.email}</span>
        </Anchor>
      }
      { profile.websiteUrl &&
        <Anchor href={profile.websiteUrl} external>
          <LinkIcon />
          {profile.websiteUrl}
        </Anchor>
      }
      { organizations.length > 0 &&
        <OwnerList title="Organizations" owners={organizations} />
      }
    </div>
  );
};
UserSidebar.propTypes = {
  profile: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    bio: PropTypes.string,
    email: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    organizations: PropTypes.object,
    websiteUrl: PropTypes.string,
  }).isRequired,
};

export default createPaginationContainer(
  UserSidebar,
  {
    profile: graphql`
      fragment UserSidebar_profile on User @argumentDefinitions(cursor: { type: "String" }) {
        avatarUrl
        bio
        email
        login
        name
        websiteUrl
        organizations(last: 10 after: $cursor) @connection(key: "UserSidebar_organizations") {
          edges {
            node {
              avatarUrl
              id
              login
              name
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
