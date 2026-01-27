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
      }),
    }),
  },
})
