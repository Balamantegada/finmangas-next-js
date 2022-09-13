import nc from 'next-connect';
import client from '../../../utils/client';

const handler = nc();

handler.get(async (req, res) => {
  const manga = await client.fetch(`*[_type == "manga" && _id == $id][0]`, {
    id: req.query.id,
  });
  res.send(manga);
});
export default handler;
