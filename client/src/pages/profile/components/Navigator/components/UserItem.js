import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import OrganizationIcon from 'components/Icons/Organization';
import LocationIcon from 'components/Icons/Location';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid rgb(85, 85, 85)',
    display: 'flex',
    padding: '2rem 0',
    '&:last-child': {
      borderBottom: 0,
    }
  },
  avatar: {
    alignSelf: 'flex-start',
    borderRadius: '3px',
    height: 'inherit',
    marginRight: '1rem',
    width: 'inherit',
  },
  avatarImg: {
    width: '50px',
    height: '50px',
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
  const overrides = {
    img: classes.avatarImg
  };
  const localUrl = user.url.replace(/https?:\/\/github\.com/, '');
  return (
    <div className={classes.root}>
      <Avatar
        classes={overrides}
        className={classes.avatar}
        src={user.avatarUrl}
        alt={user.name}
        imgProps={{ height: '50', width: '50' }}
      />
      <div>
        <Title className={classes.title} variant="h3">
          <Anchor className={classes.name} href={localUrl} decoration="secondary" variant="body1">
            {user.name}
          </Anchor>
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