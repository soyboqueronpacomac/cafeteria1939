import { env } from '../config/envs';
import { BaseWPSchema, PostSchema, PostsSchema } from '../types';

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
export async function getWPPosts() {
    const { API_URL } = env;
    const url = `${API_URL}/posts?_embed&t=${Date.now()}`;
    try {
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch posts. Status: ${res.status}`);
        }
        
        const json = await res.json();
        
        if (!json || json.length === 0) {
            return null;
        }

        return PostsSchema.parse(json);
    } catch (error) {
        console.error(`Error fetching WP posts:`, error);
        throw error;
    }
}
export async function getWPPostBySlug(slug: string) {
    const { API_URL } = env;
    const url = `${API_URL}/posts?slug=${slug}&_embed&t=${Date.now()}`;
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch post with slug: ${slug}. Status: ${res.status}`);
        }
        
        const json = await res.json();
        
        if (!json || json.length === 0) {
            return null;
        }

        return PostSchema.parse(json[0]);
    } catch (error) {
        console.error(`Error fetching WP post [${slug}]:`, error);
        throw error;
    }
}
