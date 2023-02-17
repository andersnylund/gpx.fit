import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Dropzone } from '~/components/Dropzone';
import { Map } from '~/components/Map';

const Index: NextPage = () => {
  return (
    <IndexPageContainer>
      <Map />
      <Dropzone />
    </IndexPageContainer>
  );
};

const IndexPageContainer = styled.div`
  height: 100vh;
`;

export default Index;
