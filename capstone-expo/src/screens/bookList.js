import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
import axios from'axios';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const BookList = ({ navigation }) => {
  
  return (
    <Container>
    </Container>
  );
};

export default BookList;
