import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { FileControls } from '~/components/FileControls';
import { Map } from '~/components/Map';
import { TrackControls } from '~/components/TrackControls';

const Index: NextPage = () => {
  return (
    <IndexPageContainer>
      <Map />
      <FileControls />
      <TrackControls />
    </IndexPageContainer>
  );
};

const IndexPageContainer = styled.div`
  height: 100vh;
`;

export default Index;
