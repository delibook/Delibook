import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const SearchIcon = styled.Image`
  position: absolute;
  left: 19;
  z-index: ${({ touch }) => (touch.length > 0 ? -1 : 1)};
  width: 20px;
  height: 20px;
`;

const SearchBox = styled.TextInput`
  width: 300px;
  height: 50px;
  border-radius: 10;
  padding-left: 10;
  margin: 10px;
  background-color: ${({ theme }) => theme.inputBorder};
`;

const SearchBar = () => {
  return (
    <Container>
      <SearchBox></SearchBox>
    </Container>
  );
};

export default SearchBar;
