import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-native';

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const LoanHistory = () => {
    return (
        <Container>
            <StyledText>LoanHistory</StyledText>
        </Container>
    );
};

export default LoanHistory;
