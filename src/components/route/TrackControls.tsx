import styled from '@emotion/styled';
import { useAppSelector } from '~/hooks';
import { RangeSlider } from '../RangeSlider';
import { Treshold } from './Treshold';

export const TrackControls = () => {
  const route = useAppSelector((state) => state.routes.route);

  if (!route) {
    return null;
  }

  return (
    <Container>
      <Treshold />
      <RangeSlider route={route} />
    </Container>
  );
};

const Container = styled.div`
  bottom: 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 16px 32px;
  position: absolute;
  width: calc(100vw - 64px);
  z-index: 1000;
`;
