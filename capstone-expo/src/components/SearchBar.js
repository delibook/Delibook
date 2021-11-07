import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import propTypes from 'prop-types';

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #efefef;
  border-radius: 4px;
  padding: 10px 14px 10px 12px;
  margin: 10px 20px;
  display: flex;
`;

const SearchInput = styled.TextInput`
  width: 300px;
  margin-left: 10px;
  include-font-padding: false;
  padding: 0px;
`;

const SearchBar = ({value, onChangeText, onSubmitEditing, placeholder}) => {

    return (
        <SearchBarWrapper>
          <Ionicons name="search" size={18} />
          <SearchInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            returnKeyType="search"
            returnKeyLabel="search"
            value={value}
          />
        </SearchBarWrapper>
      );
};

SearchBar.propTypes = {
  value: propTypes.string.isRequired,
  onChangeText: propTypes.func.isRequired,
  onSubmitEditing: propTypes.func.isRequired,
  placeholder: propTypes.string,
};

export default SearchBar;
