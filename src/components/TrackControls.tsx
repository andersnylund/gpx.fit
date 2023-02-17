import styled from '@emotion/styled';
import { RangeSlider } from './RangeSlider';

export const TrackControls = () => {
  return (
    <Container>
      <RangeSlider />
    </Container>
  );
};

const Container = styled.div`
  bottom: 0;
  margin: 16px 32px;
  position: absolute;
  width: calc(100vw - 64px);
  z-index: 1000;
`;
