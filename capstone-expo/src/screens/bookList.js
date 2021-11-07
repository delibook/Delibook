import React, { useContext, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
import { FontAwesome } from '@expo/vector-icons';
import { SearchBar } from '../components';
import axios from'axios';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const ItemContainer = styled.View`
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
    width: 100%;
    height: 100%;
    resizeMode: contain;
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

const ItemBottomContainer = styled.View`
    flex: 1;
    flex-direction: row;
`;

const ItemTitle = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.listTitle};
`;

const ItemAuthor = styled.Text`
    flex: 0.9;
    font-size: 15px;
    margin-top: 5px;
    margin-right: 30px;
    color: #6F6F6F;
`;

const ItemPublisher = styled.Text`
    flex: 1;
    font-size: 15px;
    margin-top: 5px;
    color: #6F6F6F;
`;

const ItemPrice = styled.Text`
    font-size: 12px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listPrice};
`;

const ButtonContainer = styled.TouchableOpacity`
    flex: 1;
    width: 90px;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
    margin-top: 5px;
    margin-right: 30px;
    background-color: #00A5F1;
`;

const ButtonTitle = styled.Text`
    font-size: 16px;
    color: ${({ theme}) => theme.buttonTitle};
`;

const Item = React.memo(
  ({ item: { id, imageURL, name, author, publisher, quantity, libraryId }, onPress }) => {
    const theme = useContext(ThemeContext);
    const { user } = useContext(UserContext);


    const _handleLoanPress = useCallback(async() => {

    }, []);

    const _handleBagPress = useCallback(async() => {
      try {
        axios({
          method: 'post',
          url: 'https://dev.delibook.shop/delibook/cart/insert',
          params: {
            bookId: `${id}`,
            libraryId: `${libraryId}`,
          },
          headers: {
            'x-access-token': `${user?.token}`
          }
        })
        .then(function(response){
          Alert.alert("알림", "책가방에 담겼습니다.");
          return response.data;
        })
        .catch(function(error){
          alert("Error",error);
        });
      } catch (e) {
        alert(libraryId);
      } finally {
      }
    }, [id, libraryId, user]);

    return (
      <ItemContainer onPress={() => onPress({ id })}>
        <ItemImageContainer 
          source={{
            uri: `${imageURL}`,
          }}
        />
        <ItemLeftContainer>
          <ItemTitle>{name}</ItemTitle>
          <ItemBottomContainer>
            <ItemAuthor>{author}</ItemAuthor>
            <ItemPublisher>{publisher}</ItemPublisher>
          </ItemBottomContainer>
          <ItemBottomContainer>
            <ButtonContainer onPress={_handleLoanPress}>
              <ButtonTitle>대출</ButtonTitle>
            </ButtonContainer>
            <ButtonContainer onPress={_handleBagPress}>
              <ButtonTitle>책가방 담기</ButtonTitle>
            </ButtonContainer>
          </ItemBottomContainer>
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
  const [like, setLike] = useState(0);
  const { user } = useContext(UserContext);

  const _handleLikePress = useCallback(async() => {
    const libraryId = route.params.id;
    try {
      axios({
        method: 'post',
        url: 'https://dev.delibook.shop/delibook/library/'+libraryId+'/like',
        headers: {
          'x-access-token': `${user?.token}`
        }
      })
      .then(function(response){
        console.log(response);
        return response.data;
      })
      .catch(function(error){
        alert("Error",error);
      });
    } catch (e) {
      alert(libraryId);
    } finally {
    }
  }, [route.params.id, user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome
          style={{ right: 20 }}
          size={25}
          color="red"
          name={like > 0 ? "heart-o":"heart"}
          onPress={_handleLikePress} 
        />
      ),
    });
  }, [navigation, setLike, like]);

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
            libraryId: route.params.id,
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
  }, [category, search, setBooks, route.params.id]);

  const _handleItemPress = params => {
    navigation.navigate('도서목록', params);
  };

  const _handleBookSearchChange = (search) => {
    setSearch(search);
  };

  const _handleBookSearchSubmit = useCallback(async() => {
    try {
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library/'+id+'/book',
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
  }, [search, user, setBooks]);
  
  return (
    <Container>
      <SearchBar 
        value={search}
        onChangeText={_handleBookSearchChange}
        onSubmitEditing={_handleBookSearchSubmit}
        placeholder="도서명을 입력하세요"
      />
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
