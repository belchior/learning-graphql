import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './List.styles';


const List = (props) => {
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

export default List;
