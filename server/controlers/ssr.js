import serverSideRender from '../../client/ssr';

export async function render (req, res) {
  const assets = res.assets;

  let {status, data} = await serverSideRender(req.url, res.assets);

  res.status(status).send(data);
}
