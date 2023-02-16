import type { NextPage } from 'next';
import styled from 'styled-components';
import { Dropzone } from '~/components/Dropzone';
import { Map } from '../components/Map';

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
