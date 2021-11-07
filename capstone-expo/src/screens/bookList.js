import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
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

const ItemImageContainer = styled.Image`
    flex: 0.2;
    width: 80;
    height: 80;
    margin-right: 10px;
`;

const ItemLeftContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemRightContainer = styled.View`
    flex: 0.2;
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
  ({ item: { id, imageURL, name, author, publisher, quantity }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id })}>
        <ItemImageContainer 
          source={{
            uri: `${imageURL}`,
          }}
        />
        <ItemLeftContainer>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{author}</ItemDescription>
          <ItemDescription>출판사 | {publisher}</ItemDescription>
        </ItemLeftContainer>
        <ItemRightContainer>
          <ItemPrice>재고: {quantity}</ItemPrice>
        </ItemRightContainer>
      </ItemContainer>
    );
  }
);

const BookList = ({ navigation, route }) => {
  const [id, setId] = useState(route.params.id);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const param = {
        category: `${category}`,
        search: `${search}`
      }
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library/'+id+'/book',
        params: { param },
      })
      .then(function(response){
        const result = response.data.result;
        const list = []
        for (let i = 0; i < result.length; i++) {
          list.push({
            id: result[i].id,
            imageURL: result[i].imageURL,
            name: result[i].name,
            author: result[i].author,
            publisher: result[i].publisher,
            quantity: result[i].quantity,
          });
        }
        setBooks(list);
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
  }, [category, search]);

  const _handleItemPress = params => {
    navigation.navigate('도서목록', params);
  };
  
  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={books}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />
    </Container>
  );
};

export default BookList;
