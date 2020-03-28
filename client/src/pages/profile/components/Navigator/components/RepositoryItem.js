import React from 'react';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import ForkIcon from 'components/Icons/Fork';
import Language from '../../Language/Language';
import LicenseIcon from 'components/Icons/License';
import Title from 'components/Title/Title';


const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid rgb(85, 85, 85)',
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
    display: 'flex',
    alignItems: 'center',
    margin: '0.5rem 0 0 0',
    '& > *': {
      display: 'flex',
      alignItems: 'center',
      margin: '4px 1rem',
      marginLeft: 0,
      fontSize: '12px',
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
    <div className={classes.root}>
      <Title className={classes.name} variant="h3">
        {repository.name}
      </Title>

      <Typography className={classes.description} variant="body2">{repository.description}</Typography>
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

