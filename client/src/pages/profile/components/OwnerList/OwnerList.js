import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import Title from 'components/Title/Title';
import Image from 'components/Image/Image';


const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem 0',
    borderTop: '1px solid #555555',
    marginTop: '1rem',
  },
  anchor: {
    margin: '0 0.5rem 0.5rem 0',
  }
}));

const OwnerList = props => {
  const { owners, title } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title component="h2" gutterBottom>{title}</Title>
      {owners.map(owner => {
        const localUrl = owner.url.replace(/https?:\/\/github\.com/, '');
        return (
          <Anchor className={classes.anchor} href={localUrl} key={owner.login}>
            <Image alt={owner.login} src={owner.avatarUrl} height={32} width={32} />
          </Anchor>
        );
      })}
    </div>
  );
};
OwnerList.propTypes = {
  owners: PropTypes.arrayOf(PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.node.isRequired,
};

export default OwnerList;
