import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';
import { GetEpisodeResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeResponse';

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div<{
  $height: number;
}>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  max-height: 650px;
  min-height: 500px;
  height: ${({ $height }) => addUnitIfNeeded($height)};
  overflow: hidden;
`;

type Props = {
  episode: GetEpisodeResponse;
};
const debounce = (func: (args?: any) => void, delay: number) => {
  let timerId: NodeJS.Timeout;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const ComicViewer: React.FC<Props> = ({ episode }) => {
  const [width, setWidth] = useState(0);

  const pageCountParView = width <= 708 ? 1 : 2;

  const candidatePageHeight = (width / pageCountParView) * 1.41;
  const reversed = episode.pages.reverse();

  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };
    const debouncedUpdateWidth = debounce(updateWidth, 100);

    window.addEventListener('resize', debouncedUpdateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  const pages =
    width <= 708
      ? [...reversed.map((page) => [page])]
      : [
          ...(() => {
            const pages = [];
            for (let i = 0; i < episode.pages.length; i += 2) {
              pages.push(reversed.slice(i, i + 2));
            }
            return pages;
          })(),
        ];
  return (
    <_Container ref={elementRef}>
      <_Wrapper $height={candidatePageHeight}>
        <ComicViewerCore pages={pages} />
      </_Wrapper>
    </_Container>
  );
};
