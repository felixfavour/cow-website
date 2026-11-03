import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        author: z.string().optional(),
        author_img: z.string().optional(),
        cover: z.string().optional(),
        created: z.string().optional(),
        updated: z.string().optional(),
        paragraph: z.string().optional(),
        tag: z.string().optional(),
        read_time: z.string().optional(),
        user_title: z.string().optional(),
        excerpt: z.string().optional(),
        /** Help Center article that covers this post's topic, e.g. /docs/going-live/multi-screen-setup. */
        docs: z.string().optional(),
      }),
    }),
    documentation: defineCollection({
      type: 'page',
      source: 'documentation/**',
      schema: z.object({
        title: z.string(),
        /** Search-result title, phrased the way people search. Falls back to `title`. */
        seoTitle: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        lastUpdated: z.string().optional(),
        order: z.number().optional(),
        draft: z.boolean().optional(),
        icon: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    }),
  },
})
