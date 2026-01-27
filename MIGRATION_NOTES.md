# Nuxt Content v2 to v3 Migration Summary

## Overview

Successfully migrated the Cow Labs Website from Nuxt Content v2 to v3.

## Changes Made

### 1. Content Configuration (`content.config.ts`)

- Changed collection definition from generic `content` collection to specific `blog` collection
- Updated source pattern from `**` to `blog/**` for better organization

**Before:**

```ts
collections: {
  content: defineCollection({
    type: 'page',
    source: '**',
  }),
}
```

**After:**

```ts
collections: {
  blog: defineCollection({
    type: 'page',
    source: 'blog/**',
  }),
}
```

### 2. Blog Detail Page (`app/pages/blog/[id].vue`)

#### Query API Changes

- Replaced `queryContent()` with `queryCollection()`
- Changed from `.findOne()` to `.first()`
- Updated field matching from `_id` pattern to `stem` field
- Simplified async data fetching

**Before:**

```ts
const { data } = await useAsyncData(`blog-${params.id}`, () =>
  queryContent("/blog")
    .where({ _id: "content:blog:" + params.id + ".md" })
    .findOne()
)
```

**After:**

```ts
const { data } = await useAsyncData(`blog-${params.id}`, () =>
  queryCollection("blog").where("stem", "=", params.id).first()
)
```

#### Component Changes

- Replaced `<ContentDoc>` with `<ContentRenderer>`
- Changed from path-based rendering to value-based rendering

**Before:**

```vue
<ContentDoc :path="data?._path" style="grid-area: content" />
```

**After:**

```vue
<ContentRenderer v-if="data" :value="data" style="grid-area: content" />
```

#### Code Cleanup

- Removed duplicate Options API script block
- Moved `getDate` helper function to Composition API setup
- Simplified data access (removed `._rawValue`)

### 3. Blog Index Page (`app/pages/blog/index.vue`)

#### Query API Changes

- Replaced `queryContent()` with `queryCollection()`
- Changed from `.find()` to `.all()`
- Removed `.only()` method (v3 returns all fields by default)

**Before:**

```ts
const blogs = await queryContent("/blog")
  .only([
    "title",
    "cover",
    "_id",
    // ... other fields
  ])
  .find()
```

**After:**

```ts
const blogs = await queryCollection("blog").all()
```

#### Field Name Updates

- Changed from `_id` to `stem` for blog identification
- Updated link generation logic

**Before:**

```vue
:to="`/blog/${topBlog?._id ?.replace('.md', '') ?.replace('content:blog:',
'')}`"
```

**After:**

```vue
:to="`/blog/${topBlog?.stem}`"
```

### 4. Blog Card Component (`app/components/BlogCard.vue`)

- Updated link generation to use `stem` field instead of `_id`

**Before:**

```vue
:to="`/blog/${blog?._id?.replace('.md', '')?.replace('content:blog:', '')}`"
```

**After:**

```vue
:to="`/blog/${blog?.stem}`"
```

## Key Differences Between v2 and v3

### API Changes

| v2               | v3                     |
| ---------------- | ---------------------- |
| `queryContent()` | `queryCollection()`    |
| `.find()`        | `.all()`               |
| `.findOne()`     | `.first()`             |
| `._path` field   | `.path` field          |
| `._id` field     | `.id` or `.stem` field |
| `<ContentDoc>`   | `<ContentRenderer>`    |

### Benefits of v3

1. **SQL-backed queries** - Faster and more powerful querying
2. **Collection-based** - Better organization and type safety
3. **Simplified API** - More intuitive method names
4. **Better performance** - Optimized for larger content sets

## Testing

- Development server starts successfully without errors
- Content processing confirms 2 collections and 35 files processed
- No compilation errors in TypeScript/Vue files

## Next Steps (Optional Enhancements)

1. Consider creating separate collections for different content types (features, changelog, etc.)
2. Implement full-text search using `queryCollectionSearchSections` API
3. Add type definitions for better TypeScript support
4. Configure navigation using `.navigation.yml` files if needed

## Files Modified

- `/content.config.ts`
- `/app/pages/blog/[id].vue`
- `/app/pages/blog/index.vue`
- `/app/components/BlogCard.vue`
