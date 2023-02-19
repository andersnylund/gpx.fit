import styled from '@emotion/styled';
import { Dropzone } from './Dropzone';

export const FileControls = () => {
  return (
    <Container>
      <Dropzone />
    </Container>
  );
};

const Container = styled.div`
  margin: 16px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
`;
