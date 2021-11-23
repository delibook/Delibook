import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts';
import { FlatList, Image, Linking, Text } from 'react-native';
import axios from'axios';

const Container = styled.View`
  flex : 1;
  background-color: ${({theme}) => theme.background};
`;

const ItemContainer = styled.View`
  background-color : white;
  flex-direction: column;
  border-color: #F1F1F1;
  border-bottom-width: 20px;
`;

const TopLibraryContainer = styled.View`
  flex: 0.2;
  flex-direction: row;
  padding: 10px;
  border-color: ${({ theme }) => theme.listBorder};
  border-bottom-width: 1.5px;
`;

const LibraryNameText = styled.Text`
  flex: 1;
  font-size: 20px;
`;

const StatusText = styled.Text`
  flex: 0.1;
  align-items: flex-end;
  margin: auto;
  font-size: 15px;
  color: ${({ theme }) => theme.listPrice};
`;

const BookContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 10px 15px;
  margin-right: 20px;
  margin-left: 20px;
`;

const ItemImageContainer = styled.Image`
background-color: ${({ theme }) => theme.listBorder};
  flex: 0.1;
  align-items: flex-start;
  width : 100%;
  height: 100%;
  resizeMode: contain;
  margin-right : 30px;
`;

const BookInfoContainer = styled.View`
  flex: 1;
  flex-direction: column;
`

const BookTitleText = styled.Text`
  flex: 1;
  font-size : 17px;
  font-weight: 600;
`;

const BookDetailInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const AuthorText = styled.Text`
  flex: 1;
  font-size: 15px;
  margin-top: 5px;
  color: #6F6F6F;
`;

const QuantityText = styled.Text`
  flex: 0.7;
  font-size: 15px;
  margin-top: 5px;
  color: #6F6F6F;
`;

const BottomContainer = styled.View`
  flex: 0.2;
  flex-direction: column;
  padding: 10px;
`;

const BottomTopContainer = styled.View`
  flex-direction: row;
`;

const PeriodText = styled.Text`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
`;

const LateDayText = styled.Text`
  flex: 0.2;
  font-size: 15px;
  margin-left : 10px;
  color : red;
`;

const BottomBottomContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
`;

const PriceText = styled.Text`
  flex: 1;
  text-align: right;
  margin: auto;
  margin-right: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.listPrice};
`;

const ButtonContainer = styled.TouchableOpacity`
  flex: 0.4;
    width: 90px;
    height : 26px;
    align-items: center;
    border-radius: 7px;
    padding: 5px;
    background-color: #3CB4EC;
`;

const ButtonTitle = styled.Text`
    font-size: 15px;
    color: ${({ theme}) => theme.buttonTitle};
`;

const Book = React.memo(
  ({ item: { id, bookId, bookThumbnail, bookTitle, author, putQuantity } }) => {

    return (
        <BookContainer>
          <ItemImageContainer 
          source={{
            uri: `${bookThumbnail}`,
          }}
          />
          <BookInfoContainer>
            <BookTitleText>{bookTitle}</BookTitleText>
            <BookDetailInfoContainer>
              <AuthorText>{author}</AuthorText>
              <QuantityText>대여수량 | {putQuantity}</QuantityText>
            </BookDetailInfoContainer>
          </BookInfoContainer>
        </BookContainer>
    );
  }
);

const Item = React.memo(
  ({ item: { id, cartId, lateDateCount, libraryName, period, price, status } }) => {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        try {
          axios({
            method: 'get',
            url: 'https://dev.delibook.shop/delibook/cart/'+cartId,
          })
            .then(function (response) {
              const result = response.data.result;
              const list = [];
              for (let i = 0; i < result.length; i++) {
                list.push({
                  id: i,
                  cartId: result[i].cartId,
                  libraryId: result[i].libraryId,
                  library: result[i].library,
                  bookId: result[i].bookId,
                  bookThumbnail: result[i].bookThumbnail,
                  author: result[i].author,
                  bookTitle: result[i].bookTitle,
                  canLoan: result[i].canLoan,
                  putQuantity: result[i].putQuantity,
                });
              }
              setCartList(list);
              return result;
            })
            .catch(function (error) {
              console.log(error);
              alert('Error', error);
            });
        } catch (e) {
          console.log(e);
          alert('Error', e);
        } finally {
        }
    }, [cartId]);

  return (
    <ItemContainer>
      <TopLibraryContainer>
        <LibraryNameText>{libraryName}</LibraryNameText>
        <StatusText>{status}</StatusText>
      </TopLibraryContainer>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={cartList}
        renderItem={({ item }) => (
            <Book item={item} />
        )}
        windowSize={3}
      />
      <BottomContainer>
        <BottomTopContainer>
          <PeriodText>기간 : {period}</PeriodText>
          <LateDayText>연체일 : {lateDateCount}</LateDayText>
        </BottomTopContainer>
        <BottomBottomContainer>
          <PriceText>{price}원</PriceText>
          <ButtonContainer>
              <ButtonTitle>반납 신청</ButtonTitle>
          </ButtonContainer>
        </BottomBottomContainer>
      </BottomContainer>
    </ItemContainer>
  );
}
);

const LoanHistory = () => {
    const [loanHistory, setLoanHistory] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        try {
          axios({
            method: 'get',
            url: 'https://dev.delibook.shop/delibook/user/usage',
            params: { type: 1 },
            headers: {
              'x-access-token': `${user?.token}`
            }
          })
          .then(function(response){
            const result = response.data.result;
            const list = []
            for (let i = 0; i < result.length; i++) {
                list.push({
                    id: i,
                    book: result[i].book,
                    cartId: result[i].cartId,
                    lateDateCount: result[i].lateDateCount,
                    libraryId: result[i].libraryId,
                    libraryName: result[i].libraryName,
                    loanDate: result[i].loanDate,
                    period: result[i].period,
                    price: result[i].price,
                    status: result[i].status,
                    toReturnDate: result[i].toReturnDate,
                });
            }
            setLoanHistory(list);
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
      }, [user]);

    return (
        <Container>
            <FlatList
                keyExtractor={item => item.id}
                data={loanHistory}
                renderItem={({ item }) => (
                    <Item item={item} />
                )}
                windowSize={3}
            />
        </Container>
    );
};

export default LoanHistory;
