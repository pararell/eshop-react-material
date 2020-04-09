import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import SearchInput from '../../../../components/SearchInput';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ProductsToolbar = props => {
  const { sortOptions, handleSorting, productsSerch, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={classes.root}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {sortOptions.map((sort, index) =>
           <Button
              key={index}
              className={classes.importButton}
              color={sort.active ? "primary" : "default"}
              onClick={event => handleSorting(sort.id)}>
            {sort.name}
          </Button>
         )
        }
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
          onChange={event => productsSerch(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductsToolbar;
