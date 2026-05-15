export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Portfolio REST API',
    version: '0.1.0',
    description: 'A small REST API showcase with Swagger documentation.',
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service is healthy',
          },
        },
      },
    },
    '/api/bookmarks': {
      get: {
        summary: 'List bookmarks',
        responses: {
          '200': {
            description: 'Bookmark list',
          },
        },
      },
      post: {
        summary: 'Create bookmark',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'url'],
                properties: {
                  title: { type: 'string', example: 'OpenAPI Specification' },
                  url: { type: 'string', example: 'https://spec.openapis.org/oas/latest.html' },
                  tags: { type: 'array', items: { type: 'string' }, example: ['api', 'docs'] },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Bookmark created' },
          '400': { description: 'Invalid request body' },
        },
      },
    },
  },
}

