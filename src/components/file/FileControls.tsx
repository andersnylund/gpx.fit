import styled from '@emotion/styled';
import { browserEnv } from '~/config/browser-env';
import { AddTestRoute } from '../AddTestRoute';
import { Dropzone } from './Dropzone';

export const FileControls = () => {
  return (
    <Container>
      <Dropzone />
      {browserEnv.NEXT_PUBLIC_SITE_ENV === 'test' && <AddTestRoute />}
    </Container>
  );
};

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
`;
