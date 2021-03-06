import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createFragmentContainer } from 'react-relay';

import ForkIcon from 'components/Icons/Fork';
import Language from 'pages/profile/components/Language/Language';
import LicenseIcon from 'components/Icons/License';
import Title from 'components/Title/Title';
import { useStyles } from './RepositoryItem.styles';
import { IRepository } from 'utils/interfaces';
import { fragmentSpec } from './RepositoryItem.relay';


interface IProps {
  repository: IRepository
}

export const RepositoryItem = (props: IProps) => {
  const { repository } = props;
  const classes = useStyles();
  const language = repository.primaryLanguage;

  return (
    <div className={classes.repositoryItem} data-testid="repository-item">
      <Title className={classes.name} variant="h3">{repository.name}</Title>

      { repository.description &&
        <Typography className={classes.description} variant="body2">{repository.description}</Typography>
      }
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

export default createFragmentContainer(RepositoryItem, fragmentSpec);
