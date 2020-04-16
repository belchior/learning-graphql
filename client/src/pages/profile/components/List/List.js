import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  list: {
    flex: '1 1 auto',
  },
  actionContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  empty: {
    padding: '2rem 0',
  }
}));

const List = props => {
  const { relay, children } = props;
  const classes = useStyles();

  const handleLoadMore = () => {
    if (relay.hasMore() === false || relay.isLoading() === true) return;
    relay.loadMore();
  };

  return (
    <div className={classes.list}>
      { Array.isArray(children) && children.length === 0
        ? <Typography className={classes.empty}>There is no item to show</Typography>
        : (
          <React.Fragment>
            {children}
            <div className={classes.actionContainer}>
              <Button onClick={handleLoadMore} disabled={relay.hasMore() === false}>
                {relay.hasMore() ? 'Load more' : 'No more items to show'}
              </Button>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};
List.propTypes = {
  children: PropTypes.node.isRequired,
  relay: PropTypes.shape({
    hasMore: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired
  }).isRequired
};

export default List;
