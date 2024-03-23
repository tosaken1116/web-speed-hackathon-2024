import { OpenAPIHono } from '@hono/zod-openapi';
import { getInfoApp } from './getInfo';

const app = new OpenAPIHono();

app.route('/', getInfoApp);

export { app as infoApp };
