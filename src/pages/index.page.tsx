import styled from '@emotion/styled';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { FileControls } from '~/components/file/FileControls';
import { TrackControls } from '~/components/route/TrackControls';

const Map = dynamic(
  () => /* c8 ignore start */ import('~/components/Map').then((mod) => mod.Map) /* c8 ignore stop */,
  { ssr: false }
);

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
