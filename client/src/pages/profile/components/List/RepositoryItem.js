import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Anchor from 'components/Anchor/Anchor';
import ForkIcon from 'components/Icons/Fork';
import Language from '../Language/Language';
import LicenseIcon from 'components/Icons/License';
import Title from 'components/Title/Title';
import { edgesToArray } from 'utils/array';


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
  const topics = edgesToArray(repository.repositoryTopics).map(item => item.topic);
  const language = repository.primaryLanguage;
  const forkCountUrl = `/${repository.owner.login}/${repository.name}/network/members`;
  return (
    <div className={classes.root}>
      <Title className={classes.name} variant="h3">
        <Anchor href={repository.url}>{repository.name}</Anchor>
      </Title>

      <Typography className={classes.description} variant="body2">{repository.description}</Typography>
      <div>
        {topics.map(topic => (
          <Anchor href={`/topics/${topic.name}`} decoration="contained" key={topic.name}>
            {topic.name}
          </Anchor>
        ))}
      </div>
      <div className={classes.details}>
        <Language color={language.color}>{language.name}</Language>
        { repository.forkCount > 0 &&
          <Anchor href={forkCountUrl} decoration="secondary">
            <ForkIcon />
            {repository.forkCount}
          </Anchor>
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

export default RepositoryItem;