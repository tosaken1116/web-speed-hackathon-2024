import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { SWRConfig, unstable_serialize } from 'swr';

import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';

import { bookApiClient } from '@wsh-2024/app/src/features/book/apiClient/bookApiClient';
import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createInjectDataStr(): Promise<Record<string, unknown>> {
  const json: Record<string, unknown> = {};

  const getRelease = async () => {
    const dayOfWeek = getDayOfWeekStr();
    const releases = await releaseApiClient.fetch({ params: { dayOfWeek } });
    json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = releases;
    await Promise.all(
      releases?.books?.map(async (book) => {
        const bookDetail = await bookApiClient.fetch({ params: { bookId: book.id } });
        json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId: book.id } }))] = bookDetail;
      }),
    );
  };

  const getFeature = async () => {
    const features = await featureApiClient.fetchList({ query: {} });
    json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = features;
    await Promise.all(
      features?.map(async ({ book }) => {
        const bookDetail = await bookApiClient.fetch({ params: { bookId: book.id } });
        json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId: book.id } }))] = bookDetail;
      }),
    );
  };

  const getRanking = async () => {
    const ranking = await rankingApiClient.fetchList({ query: {} });
    json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = ranking;
    await Promise.all(
      ranking?.map(async ({ book }) => {
        const bookDetail = await bookApiClient.fetch({ params: { bookId: book.id } });
        json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId: book.id } }))] = bookDetail;
      }),
    );
  };

  await Promise.all([getRelease(), getFeature(), getRanking()]);

  return json;
}

async function createHTML({ body, styleTags }: { body: string; styleTags: string }): Promise<string> {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags);

  return content;
}

app.get('*', async (c) => {
  const injectData = await createInjectDataStr();
  const sheet = new ServerStyleSheet();
  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <SWRConfig
          value={{
            fallback: injectData,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateOnMount: false,
            shouldRetryOnError: false,
          }}
        >
          <StaticRouter location={c.req.path}>
            <ClientApp />
          </StaticRouter>
        </SWRConfig>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
