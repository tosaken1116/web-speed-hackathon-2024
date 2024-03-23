import styled from 'styled-components';

import { Color } from '../styles/variables';

const _Wrapper = styled.div`
  width: 100%;
`;

const _Separator = styled.img`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${Color.MONO_30};
`;

export const Separator: React.FC = () => {
  return (
    <_Wrapper>
      <_Separator aria-hidden={true} height={1} width="100%" />
    </_Wrapper>
  );
};
