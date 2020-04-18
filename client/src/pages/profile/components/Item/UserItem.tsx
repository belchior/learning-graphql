import React from 'react';
import Typography from '@material-ui/core/Typography';
import { graphql } from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import Anchor from 'components/Anchor/Anchor';
import Image from 'components/Image/Image';
import OrganizationIcon from 'components/Icons/Organization';
import LocationIcon from 'components/Icons/Location';
import Title from 'components/Title/Title';
import { useStyles } from './UserItem.styles';
import { IUser } from 'utils/interfaces';


interface IProps {
  user: IUser
}

const UserItem = (props: IProps) => {
  const { user } = props;
  const classes = useStyles();
  const localUrl = user.url.replace(/https?:\/\/github\.com/, '');

  return (
    <div className={classes.userItem}>
      <Image
        alt={user.login}
        className={classes.avatar}
        height={50}
        src={user.avatarUrl}
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
