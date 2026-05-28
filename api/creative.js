// Vercel serverless function: /api/creative
// Handles GET (list), POST (create), PUT (update), DELETE (delete)
// Uses GitHub API to update data/creative.json

const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DATA_PATH = 'data/creative.json';

async function getCurrentData() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}`;
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' }
  });
  if (!resp.ok) throw new Error('Failed to fetch data');
  const json = await resp.json();
  const content = Buffer.from(json.content, 'base64').toString('utf-8');
  return { sha: json.sha, items: JSON.parse(content) };
}

async function saveData(items, sha) {
  const content = Buffer.from(JSON.stringify(items, null, 2)).toString('base64');
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ message: 'Update creative.json via admin', content: content, sha: sha })
  });
  return resp.ok;
}

export default async function handler(req, res) {
  try {
    const { sha, items } = await getCurrentData();
    const method = req.method;

    if (method === 'GET') {
      return res.status(200).json({ ok: true, items: items });
    }

    if (method === 'POST') {
      items.push(req.body.item);
      await saveData(items, sha);
      return res.status(200).json({ ok: true });
    }

    if (method === 'PUT') {
      items[req.body.index] = req.body.item;
      await saveData(items, sha);
      return res.status(200).json({ ok: true });
    }

    if (method === 'DELETE') {
      items.splice(req.body.index, 1);
      await saveData(items, sha);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
