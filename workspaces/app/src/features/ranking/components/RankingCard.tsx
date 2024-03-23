import styled from 'styled-components';

import { SvgIcon } from '../../../features/icons/components/SvgIcon';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { Skeleton } from '../../../foundation/components/Skeleton';
import { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

const _Wrapper = styled.li`
  width: 100%;
  list-style: none;
`;

const _Link = styled(Link)`
  width: 100%;
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  book: GetBookResponse;
};

const RankingCard: React.FC<Props> = ({ book }) => {
  const imageUrl = `${window.location}/assets/images/${book.image.id}.webp`;
  const authorImageUrl = `${window.location.href}/assets/images/${book.author.image.id}.webp`;

  return (
    <_Wrapper>
      <_Link href={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          <_ImgWrapper>
            <Image alt={book.name} height={96} objectFit="cover" src={imageUrl} width={96} />
          </_ImgWrapper>
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              <_AvatarWrapper>
                <Image
                  alt={`${book.author.name}のアイコン`}
                  height={32}
                  objectFit="cover"
                  src={authorImageUrl}
                  width={32}
                />
              </_AvatarWrapper>
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <SvgIcon color={Color.Secondary} height={32} type="NavigateNext" width={32} />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

export const RankingCardSkeleton = () => {
  return (
    <_Wrapper>
      <_Link href="">
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          <_ImgWrapper>
            <Skeleton height={96} width={96} />
          </_ImgWrapper>
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Skeleton height={24} width={200} />
              <Skeleton height={12} width={300} />
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              <_AvatarWrapper>
                <Skeleton height={32} width={32} circle />
              </_AvatarWrapper>
              <Skeleton height={12} width={64} />
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <SvgIcon color={Color.Secondary} height={32} type="NavigateNext" width={32} />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

export { RankingCard };
