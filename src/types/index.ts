import { z } from "astro:content";

const imageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
})

const featuredImageSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema,
})

export const BaseWPSchema = z.object({
    id: z.number(),
    slug: z.string(),
    date: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    content: z.object({
        rendered: z.string()
    }),
    excerpt: z.object({
        rendered: z.string()
    }),
    acf: z.object({
        subtitle: z.string()
    }),
    featured_images: featuredImageSchema.optional(),
})

const processSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string()
})

export const ProcessPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string(),
    }).catchall(processSchema)
})

const CategorySchema = z.object({
    name: z.string(),
    slug: z.string(),
})
export type CategoryDetail = z.infer<typeof CategorySchema>;
const CategoriesSchema = z.array(CategorySchema)

// Para obtener lo Post
export const PostSchema = BaseWPSchema.omit({
    acf: true
}).extend({
    category_details: CategoriesSchema.optional()
})

export type Post = z.infer<typeof PostSchema>;

// Par obtener todos los Posts array PostSchema.array()
export const PostsSchema = z.array(PostSchema)