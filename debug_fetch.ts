import { env } from './src/config/envs';

const { API_URL } = env;
const url = `${API_URL}/pages?slug=inicio&_embed`;

console.log(`Fetching from: ${url}`);

try {
  const res = await fetch(url);
  const json = await res.json();
  console.log('Response status:', res.status);
  console.log('Data structure:', JSON.stringify(json[0], (key, value) => {
    if (key === 'content' || key === 'excerpt') return undefined; // Skip large fields
    return value;
  }, 2));
} catch (error) {
  console.error('Fetch error:', error);
}
