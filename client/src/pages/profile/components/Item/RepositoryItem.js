import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import ForkIcon from 'components/Icons/Fork';
import Language from 'pages/profile/components/Language/Language';
import LicenseIcon from 'components/Icons/License';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  repositoryItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '2rem 0',
    '&:last-child': {
      borderBottom: 0,
    }
  },
  name: {
    fontSize: '20px',
    marginBottom: '0.5rem',
  },
  description: {
    marginBottom: '0.5rem',
  },
  details: {
    alignItems: 'center',
    display: 'flex',
    margin: '0.5rem 0 0 0',
    '& > *': {
      alignItems: 'center',
      display: 'flex',
      fontSize: '12px',
      margin: '4px 1rem',
      marginLeft: 0,
    },
    '& > * > svg': {
      marginRight: '0.4rem',
    }
  }
}));

const RepositoryItem = props => {
  const { repository } = props;
  const classes = useStyles();
  const topics = []; // edgesToArray(repository.repositoryTopics).map(item => item.topic);
  const language = repository.primaryLanguage;

  return (
    <div className={classes.repositoryItem}>
      <Title className={classes.name} variant="h3">{repository.name}</Title>

      { repository.description &&
        <Typography className={classes.description} variant="body2">{repository.description}</Typography>
      }
      <div>
        {topics.map(topic => (
          <Typography key={topic.name}>
            {topic.name}
          </Typography>
        ))}
      </div>
      <div className={classes.details}>
        { language && <Language color={language.color}>{language.name}</Language> }
        { repository.forkCount > 0 &&
          <Typography>
            <ForkIcon />
            {repository.forkCount}
          </Typography>
        }
        { repository.licenseInfo &&
          <Typography component="span">
            <LicenseIcon />
            {repository.licenseInfo.name}
          </Typography>
        }
      </div>
    </div>
  );
};
RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    description: PropTypes.string,
    forkCount: PropTypes.number,
    id: PropTypes.string,
    licenseInfo: PropTypes.shape({
      name: PropTypes.string,
    }),
    name: PropTypes.string,
    owner: PropTypes.shape({
      avatarUrl: PropTypes.string,
      login: PropTypes.string,
      url: PropTypes.string,
    }),
    primaryLanguage: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default createFragmentContainer(
  RepositoryItem,
  {
    repository: graphql`
      fragment RepositoryItem_repository on Repository {
        description
        forkCount
        id
        licenseInfo {
          name
        }
        name
        owner {
          avatarUrl
          login
          url
        }
        primaryLanguage {
          color
          name
        }
        url
      }
    `
  },
);

