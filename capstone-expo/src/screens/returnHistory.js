import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-native';

const Container = styled.View`
  align-items: center;
  background-color : #F1F1F1;
  flex : 1;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const ReturnHistory = () => {
    return (
        <Container>
            <StyledText>ReturnHistory</StyledText>
        </Container>
    );
};

export default ReturnHistory;
