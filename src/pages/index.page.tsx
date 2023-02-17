import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { FileControls } from '~/components/FileControls';
import { Map } from '~/components/Map';

const Index: NextPage = () => {
  return (
    <IndexPageContainer>
      <Map />
      <FileControls />
    </IndexPageContainer>
  );
};

const IndexPageContainer = styled.div`
  height: 100vh;
`;

export default Index;
