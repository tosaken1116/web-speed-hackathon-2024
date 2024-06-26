import { styled } from 'styled-components';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';
import { Skeleton } from '../../../foundation/components/Skeleton';
import { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';
import { GetAuthorResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';

const _Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.SMALL};
  background-color: ${Color.MONO_A};
  max-width: 192px;
  border: 1px solid ${Color.MONO_30};
`;

const _ImgWrapper = styled.div`
  > img {
    border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
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
  book: {
    id: GetBookResponse['id'];
    name: GetBookResponse['name'];
    image: GetBookResponse['image'];
    author: GetAuthorResponse;
  };
};

const BookCard: React.FC<Props> = ({ book }) => {
  const imageUrl = `${window.location.href}/assets/images/${book.image.id}.webp`;
  const authorImageUrl = `${window.location.href}/assets/images/${book.author.image.id}.webp`;

  return (
    <_Wrapper href={`/books/${book.id}`}>
      <_ImgWrapper>
        <Image alt={book.image.alt} height={128} objectFit="cover" src={imageUrl} width={192} />
      </_ImgWrapper>

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Text color={Color.MONO_100} typography={Typography.NORMAL14} weight="bold">
          {book.name}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <_AvatarWrapper>
            <Image alt={book.author.name} height={32} objectFit="cover" src={authorImageUrl} width={32} />
          </_AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            {book.author.name}
          </Text>
        </Flex>
      </Flex>
    </_Wrapper>
  );
};

export const BookCardSkeleton = () => {
  return (
    <_Wrapper href="">
      <_ImgWrapper>
        <Skeleton height={128} width={192} />
      </_ImgWrapper>

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Skeleton height={16} width={200} />

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <_AvatarWrapper>
            <Skeleton height={32} width={32} circle />
          </_AvatarWrapper>
          <Skeleton height={16} width={200} />
        </Flex>
      </Flex>
    </_Wrapper>
  );
};

export { BookCard };
