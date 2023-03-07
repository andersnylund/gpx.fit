import styled from '@emotion/styled';
import { useAppSelector } from '~/hooks';
import { RangeSlider } from '../RangeSlider';
import { ExportButton } from './ExportButton';
import { Treshold } from './Treshold';

export const TrackControls = () => {
  const route = useAppSelector((state) => state.routes.route);

  if (!route) {
    return null;
  }

  return (
    <Container>
      <ExportButton />
      <Treshold />
      <RangeSlider route={route} />
    </Container>
  );
};

const Container = styled.div`
  align-items: flex-end;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 32px;
  position: absolute;
  width: calc(100vw - 64px);
  z-index: 1000;
`;
