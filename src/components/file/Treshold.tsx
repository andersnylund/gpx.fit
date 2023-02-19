import styled from '@emotion/styled';
import { Input } from '@mui/joy';

export const Treshold = () => {
  return (
    <TresholdContainer>
      <Input
        variant="soft"
        type="number"
        defaultValue={10}
        slotProps={{
          input: {
            step: 1,
          },
        }}
      />
    </TresholdContainer>
  );
};

const TresholdContainer = styled.div`
  width: 100px;
`;
