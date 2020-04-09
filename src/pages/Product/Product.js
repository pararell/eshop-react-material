import React, { useContext, useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Paper, Tabs, Tab, Grid } from '@material-ui/core';


import { StoreContext } from '../../store';
import ProductCard from '../ProductList/components/ProductCard/ProductCard';
import { getProduct } from '../../utils/APIUtils';


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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  }
}));

const Product = ({ match: {params : {id}} }) => {
  const classes = useStyles();

  const [{product, loading, lang, currency}, dispatch] = useContext(StoreContext);
  const [tabVal, setTab] = useState(0);

  const getOneProduct = useCallback(async (id) => {
    dispatch({ type: 'SET_STATE', payload: {type: 'loading', value: true} });

    try {
      const oneProduct = await getProduct(id);

      console.log(oneProduct, 'oneProduct')

      dispatch({ type: 'SAVE_PRODUCT', payload: {...oneProduct, ...oneProduct[lang] } });

    } catch {
        dispatch({ type: 'SAVE_PRODUCT', payload: null });
    }

  },[dispatch, lang])

  useEffect(() => {
    getOneProduct(id);
  }, [id, getOneProduct]);


  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {loading || !product
          ?
            <div>Loading...</div>
          :
            <Grid
              container
              spacing={3}
            >
                <Grid
                  item
                  key={product.id}
                  xs={12}
                >
                  <ProductCard product={product} currency={currency}/>

                  <Paper square className={classes.content}>
                    <Tabs value={tabVal}
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="disabled tabs example"
                    >
                      <Tab label="Description" />
                      <Tab label="Images" />
                    </Tabs>
                    <TabPanel value={tabVal} index={0}>
                      {product.descriptionFull.map((desc,i) =>
                        <div key={i} dangerouslySetInnerHTML={{__html: desc}}>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value={tabVal} index={1}>
                      {product.images.map((img, i) =>
                          <img key={i} alt={product.title} src={img}></img>
                        )}
                    </TabPanel>
                  </Paper>
                </Grid>
            </Grid>
      }
      </div>

    </div>
  );
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

export default Product;
