export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const subpath = req.url ? req.url.replace(/^\/api\/nvidia/, '') : '/v1/chat/completions';
    const targetUrl = 'https://integrate.api.nvidia.com' + (subpath.startsWith('/') ? subpath : '/' + subpath);

    const response = await fetch(targetUrl, {
      method: req.method || 'POST',
      headers: {
        'Authorization': req.headers.authorization || '',
        'Content-Type': 'application/json'
      },
      body: req.method !== 'GET' && req.body ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
