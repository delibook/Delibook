import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
import { SearchBar } from '../components';
import axios from'axios';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.listBorder};
    padding: 10px 15px;
    margin-right: 20px;
    margin-left: 20px;
`;

const ItemLeftContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemRightContainer = styled.View`
    flex: 0.3;
    align-items: flex-end;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.listTitle};
`;

const ItemDescription = styled.Text`
    font-size: 15px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listDescription};
`;

const ItemPrice = styled.Text`
    font-size: 12px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listPrice};
`;

const Item = React.memo(
  ({ item: { id, name, cityName, sigunguName, closeDay, type, tip }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id, name })}>
        <ItemLeftContainer>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{cityName} {sigunguName}</ItemDescription>
          <ItemDescription>휴관일 | {closeDay}</ItemDescription>
        </ItemLeftContainer>
        <ItemRightContainer>
          <ItemDescription>{type}</ItemDescription>
          <ItemPrice>{tip}원</ItemPrice>
        </ItemRightContainer>
      </ItemContainer>
    );
  }
);

const LibraryList = ({ navigation }) => {
  const [librarys, setLibrarys] = useState([]);
  const [distance, setDistance] = useState('');
  const [search, setSearch] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    try {
      const param = {
        distance: `${distance}`,
        search: `${search}`
      }
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library',
        params: { param },
        headers: {
          'x-access-token': `${user?.token}`
        }
      })
      .then(function(response){
        const result = response.data.result;
        const list = []
        for (let i = 0; i < result.length; i++) {
          list.push({
            id: result[i].id,
            name: result[i].name,
            cityName: result[i].cityName,
            sigunguName: result[i].sigunguName,
            closeDay: result[i].closeDay,
            type: result[i].type,
            tip: result[i].tip,
          });
        }
        setLibrarys(list);
        return response.res;
      })
      .catch(function(error){
        console.log(error);
        alert("Error",error);
      });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [distance, search, user]);

  const _handleItemPress = params => {
    navigation.navigate('도서목록', params);
  };

  const _handleSearchChange = (search) => {
    setSearch(search);
  };

  const _handleSearchSubmit = useCallback(async() => {
    console.log(search);
    try {
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library',
        params: { 
          search: `${search}` 
        },
        headers: {
          'x-access-token': `${user?.token}`
        }
      })
      .then(function(response){
        const result = response.data.result;
        const list = []
        for (let i = 0; i < result.length; i++) {
          list.push({
            id: result[i].id,
            name: result[i].name,
            cityName: result[i].cityName,
            sigunguName: result[i].sigunguName,
            closeDay: result[i].closeDay,
            type: result[i].type,
            tip: result[i].tip,
          });
        }
        console.log(list);
        setLibrarys(list);
        return response.res;
      })
      .catch(function(error){
        console.log(error);
        alert("Error",error);
      });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [distance, search, user]);

  return (
    <Container>
      <SearchBar 
        value={search}
        onChangeText={_handleSearchChange}
        onSubmitEditing={_handleSearchSubmit}
        placeholder="도서관을 입력하세요"
      />
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={librarys}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />
    </Container>
  );
};

export default LibraryList;
