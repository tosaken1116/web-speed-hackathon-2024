import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { COMPANY } from './constants/Company';
import { CONTACT } from './constants/Contact';
import { OVERVIEW } from './constants/Overview';
import { QUESTION } from './constants/Question';
import { TERM } from './constants/Term';
import { GetInfoRequestParamsSchema } from '@wsh-2024/schema/src/api/info/GetInfoRequest';
import { GetInfoResponseSchema } from '@wsh-2024/schema/src/api/info/GetInfoResponse';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/info/{type}',
  request: {
    params: GetInfoRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetInfoResponseSchema,
        },
      },
      description: 'Get release.',
    },
  },
  tags: ['[App] info API'],
});
const infomations = {
  company: COMPANY,
  contact: CONTACT,
  overview: OVERVIEW,
  question: QUESTION,
  term: TERM,
};
app.openapi(route, (c) => {
  const params = c.req.valid('param');
  return c.json({ text: infomations[params.type] });
});

export { app as getInfoApp };
