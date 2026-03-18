import { env } from '../config/envs';
import { BaseWPSchema } from '../types';

export async function getWPPageBySlug(slug: string, schema = BaseWPSchema) {
    const { API_URL } = env;
    const url = `${API_URL}/pages?slug=${slug}&_embed&t=${Date.now()}`;
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch page with slug: ${slug}. Status: ${res.status}`);
        }
        
        const json = await res.json();
        
        if (!json || json.length === 0) {
            return null;
        }

        return schema.parse(json[0]);
    } catch (error) {
        console.error(`Error fetching WP page [${slug}]:`, error);
        throw error;
    }
}
