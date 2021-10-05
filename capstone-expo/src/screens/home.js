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

const Home = () => {
  return (
    <Container>
      <StyledText>Home</StyledText>
    </Container>
  );
};

export default Home;
