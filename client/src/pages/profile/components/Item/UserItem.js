import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import Image from 'components/Image/Image';
import OrganizationIcon from 'components/Icons/Organization';
import LocationIcon from 'components/Icons/Location';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  userItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    padding: '2rem 0',
    '&:last-child': {
      borderBottom: 0,
    }
  },
  avatar: {
    alignSelf: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    flex: '0 0 auto',
    marginRight: '1rem',
  },
  title: {
    display: 'flex',
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
  },
  name: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: '0.5rem',
  },
  login: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  bio: {
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

const UserItem = props => {
  const { user } = props;
  const classes = useStyles();
  const localUrl = user.url.replace(/https?:\/\/github\.com/, '');
  return (
    <div className={classes.userItem}>
      <Image
        className={classes.avatar}
        src={user.avatarUrl}
        alt={user.login}
        height={50}
        width={50}
      />
      <div>
        <Title className={classes.title} variant="h3">
          { user.name &&
            <Anchor className={classes.name} href={localUrl} decoration="secondary" variant="body1">
              {user.name}
            </Anchor>
          }
          <Anchor className={classes.login} href={localUrl} decoration="secondary" variant="body2">
            {user.login}
          </Anchor>
        </Title>
        { user.bio &&
          <Typography className={classes.bio} variant="body2">{user.bio}</Typography>
        }
        <div>
          { user.company &&
            <Typography className={classes.label} variant="body2" component="span">
              <OrganizationIcon />
              {user.company}
            </Typography>
          }
          { user.location &&
            <Typography className={classes.label} variant="body2" component="span">
              <LocationIcon />
              {user.location}
            </Typography>
          }
        </div>
      </div>
    </div>
  );
};
UserItem.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    bio: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default createFragmentContainer(
  UserItem,
  {
    user: graphql`
      fragment UserItem_user on User {
        avatarUrl
        bio
        company
        location
        login
        name
        url
      }
    `
  },
);
