import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { GlobalContext } from 'components/App/App';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import EmailIcon from 'components/Icons/Email';
import LinkIcon from 'components/Icons/Link';
import Title from 'components/Title/Title';
import UserList from './components/UserList/UserList';
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
  const user = useContext(GlobalContext);
  const organizations = edgesToArray(user.organizations);
  return (
    <div className={classes.root}>
      <img className={classes.avatar} src={user.avatarUrl} alt={user.name} />
      <Title className={classes.vcard} variant="h1">
        <Typography className={classes.name}>{user.name}</Typography>
        <Typography className={classes.login}>{user.login}</Typography>
      </Title>
      <Typography className={classes.bio} variant="body2">{user.bio}</Typography>
      <Anchor variant="body2">
        <EmailIcon />
        <span>{user.email}</span>
      </Anchor>
      <Anchor variant="body2">
        <LinkIcon />
        {user.websiteUrl}
      </Anchor>

      <UserList title="Organizations" users={organizations} />
    </div>
  );
};

export default Sidebar;