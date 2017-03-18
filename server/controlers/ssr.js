import serverSideRender from '../../client/ssr';

export async function render (req, res) {
  let {status, data} = await serverSideRender(req.url);

  res.status(status).send(data);
}
