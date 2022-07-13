import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../utils/image';

export default function MangaItem({ manga }) {
  return (
    <Card>
      <NextLink href={`/manga/${manga.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component='img'
            image={urlForThumbnail(manga.image)}
            title={manga.name}
          ></CardMedia>
          <CardContent>
            <Typography>{manga.name}</Typography>
            <Typography>
              {manga.rating} ({manga.numReviews} reviews)
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${manga.price}</Typography>
        <Button size='small' color='primary'>
          Adicionar ao carrinho
        </Button>
      </CardActions>
    </Card>
  );
}
