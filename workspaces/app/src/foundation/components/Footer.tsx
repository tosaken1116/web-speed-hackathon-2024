import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

import { useInfo } from '../../features/info/hooks/useInfo';

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;
type Props = {
  updateDialogContent: SetAtom<[content: JSX.Element | null], void>;
  id: string;
  isClient: boolean;
  type: 'term' | 'contact' | 'question' | 'company' | 'overview';
  children: string;
};

const ModalOpenButton = ({ updateDialogContent, id, isClient, type, children }: Props) => {
  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={id} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={id} typography={Typography.NORMAL16}>
          {children}
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {text}
        </Text>
      </_Content>,
    );
  };
  const {
    data: { text },
  } = useInfo({ params: { type: type } });
  return (
    <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
      {children}
    </_Button>
  );
};

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);
  if (!isClient) {
    return <></>;
  }
  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <ModalOpenButton
            isClient={isClient}
            id={termDialogA11yId}
            type="term"
            updateDialogContent={updateDialogContent}
          >
            利用規約
          </ModalOpenButton>
          <ModalOpenButton
            isClient={isClient}
            id={contactDialogA11yId}
            type="contact"
            updateDialogContent={updateDialogContent}
          >
            お問い合わせ
          </ModalOpenButton>
          <ModalOpenButton
            isClient={isClient}
            id={questionDialogA11yId}
            type="question"
            updateDialogContent={updateDialogContent}
          >
            Q&A
          </ModalOpenButton>
          <ModalOpenButton
            isClient={isClient}
            id={companyDialogA11yId}
            type="company"
            updateDialogContent={updateDialogContent}
          >
            運営会社
          </ModalOpenButton>
          <ModalOpenButton
            isClient={isClient}
            id={overviewDialogA11yId}
            type="overview"
            updateDialogContent={updateDialogContent}
          >
            Cyber TOONとは
          </ModalOpenButton>
        </Flex>
      </Flex>
    </Box>
  );
};
