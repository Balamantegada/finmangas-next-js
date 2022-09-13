import config from './config';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: true,
});
export default client;
