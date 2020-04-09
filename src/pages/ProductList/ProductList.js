import React, { useContext, useEffect, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Link, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import ProductsToolbar  from './components/ProductsToolbar/ProductsToolbar';
import ProductCard from './components/ProductCard/ProductCard';
import { StoreContext } from '../../store';
import { getAllProducts } from '../../utils/APIUtils';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [{products, loading, lang, currency, sortOptions}, dispatch] = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState(products.all);

  const getProducts = useCallback(async (lang, initPage, sortOptions) => {
    dispatch({ type: 'SET_STATE', payload: {type: 'loading', value: true} });
      const params = {
        lang,
        page: initPage,
        sort: sortOptions.filter(sort => sort.active)[0].id
      };
      try {
        const allProducts = await getAllProducts(params);
        const {docs,total,limit,page,pages} = allProducts;

        dispatch({ type: 'SAVE_PRODUCTS', payload: {
            all: docs,
            total, limit, page, pages
          }
        });

        setFilteredProducts(docs);
      } catch {
          dispatch({ type: 'SAVE_PRODUCTS', payload: {
              all: []
            }
          });
          setFilteredProducts([]);
      }
    }, [dispatch]);

  useEffect(() => {
    getProducts(lang, products.page, sortOptions)
  }, [lang, products.page, sortOptions, getProducts]);


  const handlePagination = (type) => {
    const {page, pages} = products;
    if ((type === '+' && page + 1 > pages) || (type === '-' && page - 1 < 1)) {
      return;
    }
    const newPage = type === '+' ? page + 1 : page - 1;

    dispatch({ type: 'SET_STATE', payload: {type: 'products', value: {...products, page: newPage}} });
  }

  const handleSorting = (id) => {
    const actualSorts = sortOptions
      .map(sort => sort.id === id ? ({...sort, active: true}) : ({...sort, active: false}));

    dispatch({ type: 'SET_STATE', payload: {type: 'sortOptions', value: actualSorts} });
  }


  const handleSearch = (searchQery) => {
    const searchProducts = products.all
    .filter(product => {
        const title = product.title.toLowerCase();
        const query = searchQery.toLowerCase();

        return title.includes(query);
      })

    setFilteredProducts(searchProducts);
  }

  return (
    <div className={classes.root}>
      <ProductsToolbar
        sortOptions={sortOptions}
        handleSorting={handleSorting}
        productsSerch={handleSearch}
        />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {loading
            ? <div>Loading...</div>
            : filteredProducts.map(product => (
              <Grid
                item
                key={product._id}
                lg={4}
                md={6}
                xs={12}>
                <Link
                    component={RouterLink}
                    to={"/product/" + product.titleUrl}
                    underline="none">
                  <ProductCard product={product} currency={currency} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">{products.page} of {products.pages}</Typography>
        <IconButton onClick={event => handlePagination('-')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={event => handlePagination('+')}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default withRouter(ProductList);
