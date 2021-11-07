import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

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
  margin-left: 10px;
  include-font-padding: false;
  padding: 0px;
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const SearchBar = () => {
    const [value, setValue] = useState('');

    return (
        <SearchBarWrapper>
          <Ionicons name="search" size={18} />
          <SearchInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setValue}
            placeholder="검색어를 입력해 주세요."
            returnKeyType="search"
            returnKeyLabel="search"
            value={value}
          />
        </SearchBarWrapper>
      );
};

export default SearchBar;
