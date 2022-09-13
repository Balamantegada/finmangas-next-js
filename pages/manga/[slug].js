import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';
import client from '../../utils/client';
import { urlFor, urlForThumbnail } from '../../utils/image';
import { store } from '../../utils/store';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function ProductScreen(props) {
  const { slug } = props;
  const {
    state: { cart },
    dispatch,
  } = useContext(store);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    manga: null,
    loading: true,
    error: '',
  });
  const { manga, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const manga = await client.fetch(
          `
              *[_type == "manga" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, manga, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, []);
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/mangas/${manga._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: manga._id,
        name: manga.name,
        countInStock: manga.countInStock,
        slug: manga.slug.current,
        price: manga.price,
        image: urlForThumbnail(manga.image),
        quantity,
      },
    });
    enqueueSnackbar(`${manga.name} added to the cart`, {
      variant: 'success',
    });
  };
  return (
    <Layout title={manga?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant='error'>{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href='/' passHref>
              <Link>
                <Typography>Voltar</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(manga.image)}
                alt={manga.name}
                layout='responsive'
                width={640}
                height={640}
              />
            </Grid>
            <Grid md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component='h1' variant='h1'>
                    {manga.name}
                  </Typography>
                </ListItem>
                <ListItem>Categoria: {manga.category}</ListItem>
                <ListItem>Produtor/a: {manga.brand}</ListItem>
                <ListItem>
                  <Rating value={manga.rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ({manga.numReviews} reviews)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Descrisão: {manga.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Preço</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${manga.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {manga.countInStock > 0
                            ? 'Em estoque'
                            : 'Indisponível'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={addToCartHandler}
                      fullWidth
                      variant='contained'
                    >
                      Adicionar ao carrinho
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
