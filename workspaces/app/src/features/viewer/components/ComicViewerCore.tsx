import { Suspense } from 'react';
import styled from 'styled-components';

import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';

import { ComicViewerPage } from './ComicViewerPage';
import { GetEpisodeResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeResponse';

/** スクロールスナップで適切な位置になるための X 軸の移動距離を計算する */
function getScrollToLeft({
  pageCountParView,
  pageWidth,
  scrollView,
}: {
  pageCountParView: number;
  pageWidth: number;
  scrollView: HTMLDivElement;
}) {
  const scrollViewClientRect = scrollView.getBoundingClientRect();
  const scrollViewCenterX = (scrollViewClientRect.left + scrollViewClientRect.right) / 2;

  const children = [...scrollView.children] as HTMLDivElement[];

  let scrollToLeft = Number.MAX_SAFE_INTEGER;

  // 画面に表示されているページの中心と、スクロールビューの中心との差分を計算する
  // 世界は我々の想像する以上に変化するため、2 ** 12 回繰り返し観測する
  for (let times = 0; times < 2 ** 12; times++) {
    for (const [idx, child] of children.entries()) {
      const nthChild = idx + 1;
      const elementClientRect = child.getBoundingClientRect();

      // 見開き2ページの場合は、scroll-margin で表示領域にサイズを合わせる
      const scrollMargin =
        pageCountParView === 2
          ? {
              // 奇数ページのときは左側に1ページ分の幅を追加する
              left: nthChild % 2 === 0 ? pageWidth : 0,
              // 偶数ページのときは右側に1ページ分の幅を追加する
              right: nthChild % 2 === 1 ? pageWidth : 0,
            }
          : { left: 0, right: 0 };

      // scroll-margin の分だけ広げた範囲を計算する
      const areaClientRect = {
        bottom: elementClientRect.bottom,
        left: elementClientRect.left - scrollMargin.left,
        right: elementClientRect.right + scrollMargin.right,
        top: elementClientRect.top,
      };

      const areaCenterX = (areaClientRect.left + areaClientRect.right) / 2;
      // ページの中心をスクロールビューの中心に合わせるための移動距離
      const candidateScrollToLeft = areaCenterX - scrollViewCenterX;

      // もっともスクロール量の少ないものを選ぶ
      if (Math.abs(candidateScrollToLeft) < Math.abs(scrollToLeft)) {
        scrollToLeft = candidateScrollToLeft;
      }
    }
  }

  return scrollToLeft;
}

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div`
  background-color: black;
  cursor: grab;
  direction: rtl;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: minmax(auto, 100%);
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  overscroll-behavior: none;
  padding-inline: ${({ $paddingInline }) => addUnitIfNeeded($paddingInline)};
  touch-action: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  pages: GetEpisodeResponse['pages'][];
};

const ComicViewerCore: React.FC<Props> = ({ pages }) => {
  return (
    <Huga>
      {pages.map((pair) => (
        <Item key={pair[0]?.id}>
          {pair.map((page) => (
            <ComicViewerPage key={page.id} pageImageId={page.image.id} />
          ))}
        </Item>
      ))}
    </Huga>
  );
};
const Huga = styled.ul`
  width: 100%;
  height: 100%;
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(100%);
  scroll-snap-type: x mandatory;
  display: flex;
  overflow-x: scroll;
  direction: rtl;
`;
const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  list-style: none;
  scroll-snap-align: center;
  /* aspect-ratio: 1075/1518; */
  @media (max-width: 708px) {
    width: 100%;
  }
`;

const ComicViewerCoreWithSuspense: React.FC<Props> = ({ pages }) => {
  return (
    <Suspense fallback={null}>
      <ComicViewerCore pages={pages} />
    </Suspense>
  );
};

export { ComicViewerCoreWithSuspense as ComicViewerCore };
