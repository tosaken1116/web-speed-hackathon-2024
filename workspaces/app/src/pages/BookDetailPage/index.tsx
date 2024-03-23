import { useAtom } from 'jotai/react';
import { Suspense, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import { FavoriteBookAtomFamily } from '../../features/book/atoms/FavoriteBookAtomFamily';
import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem, EpisodeListItemSkeleton } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Link } from '../../foundation/components/Link';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { BottomNavigator } from './internal/BottomNavigator';
import { Skeleton } from '../../foundation/components/Skeleton';
import { book } from '@wsh-2024/schema/src/models';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _AuthorWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: ${Space * 1}px;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();
  invariant(bookId);

  const { data: book } = useBook({ params: { bookId } });
  const { data: episodeList } = useEpisodeList({ query: { bookId } });

  const [isFavorite, toggleFavorite] = useAtom(FavoriteBookAtomFamily(bookId));
  const href = `${window.location.protocol}//${window.location.host}`;
  const bookImageUrl = `${href}/assets/images/${book.image.id}.webp`;
  const authorImageUrl = `${href}/assets/images/${book.author.image.id}.webp`;

  const handleFavClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const latestEpisode = episodeList?.find((episode) => episode.chapter === 1);

  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <_HeadingWrapper aria-label="作品情報">
        <Image alt={book.name} height={256} objectFit="cover" src={bookImageUrl} width={192} loading="eager" />
        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
          <Box>
            <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
              {book.name}
            </Text>
            <Spacer height={Space * 1} />
            <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.description}
            </Text>
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper href={`/authors/${book.author.id}`}>
            <_AvatarWrapper>
              <Image
                alt={book.author.name}
                height={32}
                objectFit="cover"
                src={authorImageUrl}
                loading="eager"
                width={32}
              />
            </_AvatarWrapper>
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.author.name}
            </Text>
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>

      <BottomNavigator
        bookId={bookId}
        isFavorite={isFavorite}
        latestEpisodeId={latestEpisode?.id ?? ''}
        onClickFav={handleFavClick}
      />

      <Separator />

      <section aria-label="エピソード一覧">
        <Flex align="center" as="ul" direction="column" justify="center">
          {episodeList.map((episode, index) => (
            <EpisodeListItem key={episode.id} bookId={bookId} episodeId={episode.id} eagerLoad={index < 4} />
          ))}
          {episodeList.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作品はまだエピソードがありません
              </Text>
            </>
          )}
        </Flex>
      </section>
    </Box>
  );
};

const BookDetailPageSkeleton = () => {
  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <_HeadingWrapper aria-label="作品情報">
        <Skeleton height={256} width={192} />
        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
          <Box>
            <Skeleton height={20} width={200} />
            <Spacer height={Space * 1} />
            <Skeleton height={14} width={200} />
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper href={''}>
            <_AvatarWrapper>
              <Skeleton height={32} width={32} circle />
            </_AvatarWrapper>
            <Skeleton height={14} width={200} />
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>

      <Separator />

      <section aria-label="エピソード一覧">
        <Flex align="center" as="ul" direction="column" justify="center">
          {Array.from({ length: 5 }).map((_, index) => (
            <EpisodeListItemSkeleton key={`episode-${index}`} />
          ))}
        </Flex>
      </section>
    </Box>
  );
};

const BookDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<BookDetailPageSkeleton />}>
      <BookDetailPage />
    </Suspense>
  );
};

export { BookDetailPageWithSuspense as BookDetailPage };
