import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const Contents = styled.Text`
  flex: 1;
  margin: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

const HomePost = ({ text }) => {
  return (
    <View
      style={{
        height: 40,
        width: 300,
        borderBottomWidth: 1,
        borderColor: '#75CBF3',
      }}
    >
      <Contents>{text}</Contents>
    </View>
  );
};

HomePost.propTypes = {
  text: propTypes.string.isRequired,
};

export default HomePost;
