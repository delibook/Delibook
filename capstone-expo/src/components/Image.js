import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const Image = ({ url, imageStyle, rounded }) => {
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
    </Container>
  );
};

Image.defaultProps = {
  rounded: false,
};

Image.propTypes = {
  uri: propTypes.string,
  imageStyle: propTypes.object,
  rounded: propTypes.bool,
};

export default Image;
