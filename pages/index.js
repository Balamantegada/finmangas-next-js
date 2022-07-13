import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MangaItem from '../components/MangaItem';
import client from '../utils/client';

export default function Home() {
  const [state, setState] = useState({
    mangas: [],
    error: '',
    loading: true,
  });
  const { loading, error, mangas } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangas = await client.fetch(`*[_type == "manga"]`);
        setState({ mangas, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert varint='danger'>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {mangas.map((manga) => (
            <Grid item md={3} key={manga.slug}>
              <MangaItem manga={manga}></MangaItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
