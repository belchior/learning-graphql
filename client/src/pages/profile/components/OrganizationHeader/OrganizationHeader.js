import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import Image from 'components/Image/Image';
import LinkIcon from 'components/Icons/Link';
import LocationIcon from 'components/Icons/Location';
import OrganizationIcon from 'components/Icons/Organization';
import Title from 'components/Title/Title';

const useStyles = makeStyles(theme => ({
  organizationHeader: {
    display: 'flex',
    flex: '1',
  },
  avatar: {
    marginRight: '1.5rem',
    maxWidth: '100%',
  },
  description: {
    marginBottom: '1rem',
  },
  label: {
    alignItems: 'center',
    display: 'inline-flex',
    marginRight: '1rem',
    '& svg:first-of-type': {
      marginRight: '0.4rem',
    },
    '& svg:last-of-type:not(:first-of-type)': {
      marginLeft: '0.4rem',
    }
  },
}));

const OrganizationHeader = props => {
  const { profile } = props;
  const classes = useStyles();

  return (
    <div className={classes.organizationHeader}>
      <Image
        className={classes.avatar}
        src={profile.avatarUrl}
        alt={profile.login}
        height={100}
        width={100}
      />
      <div>
        { profile.name && <Title component="h1" gutterBottom variant="h2">{profile.name}</Title> }
        { profile.description &&
          <Typography gutterBottom>{profile.description}</Typography>
        }
        { profile.company &&
          <Typography className={classes.label} component="span">
            <OrganizationIcon />
            {profile.company}
          </Typography>
        }
        { profile.location &&
          <Typography className={classes.label} component="span">
            <LocationIcon />
            {profile.location}
          </Typography>
        }
        { profile.websiteUrl &&
          <Anchor
            className={classes.label}
            decoration="secondary"
            external
            href={profile.websiteUrl}
          >
            <LinkIcon />
            {profile.websiteUrl}
          </Anchor>
        }
      </div>
    </div>
  );
};
OrganizationHeader.propTypes = {
  profile: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
    websiteUrl: PropTypes.string,
  }).isRequired,
};

export default createFragmentContainer(OrganizationHeader, {
  profile: graphql`
    fragment OrganizationHeader_profile on Organization {
      avatarUrl
      description
      location
      login
      name
      url
      websiteUrl
    }
  `
});

