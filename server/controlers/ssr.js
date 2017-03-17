import renderHtml from '../../client/ssr';

export async function render (req, res) {
  let result = await renderHtml(req.url);

  if (result.status === 200) {
    res.status(200).send(result.html);
  }
  else if (result.status === 302) {
    // 重定向
  }
}
