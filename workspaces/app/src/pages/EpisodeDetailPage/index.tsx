import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem, EpisodeListItemSkeleton } from '../../features/episode/components/EpisodeListItem';
import { useEpisode } from '../../features/episode/hooks/useEpisode';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';
import styled from 'styled-components';

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  const { data: book } = useBook({ params: { bookId } });
  const { data: episode } = useEpisode({ params: { episodeId } });

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episode={episode} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {book.episodes.map((episode, index) => (
            <EpisodeListItem key={episode.id} bookId={bookId} episodeId={episode.id} eagerLoad={index < 5} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
const _ComicSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1.41;
`;

const EpisodeDetailPageSkeleton = () => {
  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <_ComicSkeleton />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {Array.from({ length: 10 }).map((_, index) => (
            <EpisodeListItemSkeleton key={`episode-${index}`} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<EpisodeDetailPageSkeleton />}>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
