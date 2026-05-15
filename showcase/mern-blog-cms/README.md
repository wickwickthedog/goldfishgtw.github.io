# MERN Blog CMS Starter

This is the first recommended build because it ties together MongoDB, Express, React, authentication, and your portfolio blog content.

## Suggested Build Steps

1. Start with the Express API in `server`.
2. Add MongoDB locally or with MongoDB Atlas.
3. Build the React admin dashboard in `client`.
4. Connect your portfolio blog section to the public post API.

## API Shape

- `GET /api/health`: service health.
- `GET /api/posts`: list published posts.
- `GET /api/posts/:slug`: read one post.
- `POST /api/posts`: create a post.
- `PATCH /api/posts/:id`: update a post.
- `DELETE /api/posts/:id`: delete a post.

The create, update, and delete routes should become admin-protected after auth is added.

