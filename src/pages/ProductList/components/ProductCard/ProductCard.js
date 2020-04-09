import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import LocalOffer from '@material-ui/icons/LocalOffer';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 100,
    width: 100,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = props => {
  const { product, currency, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={classes.root}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt={product.mainImage.name}
            className={classes.image}
            src={product.mainImage.url}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              {product.stock}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <LocalOffer className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.salePrice} {currency}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <AddShoppingCart className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >

            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
