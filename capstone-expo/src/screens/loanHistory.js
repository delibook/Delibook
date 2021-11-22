import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts';
import { FlatList, Image } from 'react-native';
import axios from'axios';

const Container = styled.View`
  align-items: center;
  background-color : #F1F1F1;
  flex : 1;
`;

const ItemContainer = styled.View`
    background-color : white;
    flex : 1;
    flex-direction: column;
    margin-bottom : 20px;
    width : 100%
`;

const TopLibraryContainer = styled.View`
    background-color : white;
    flex : 0.13;
    flex-direction: row;
    margin-top : 10px;
`;

const BottomLibraryContainer = styled.View`
    background-color : white;
    flex : 0.1;
    flex-direction : row;
`;

const PriceContainer = styled.View`
   background-color : white;
    flex : 1;
    flex-direction : row;
`;


const BookContainer = styled.View`
    background-color : white;
    flex-direction: row;
    margin-bottom : 10px;
    width : 100%;
    padding-bottom : 10px;
    border-bottom-width: 1px;
    height : 120px;
    border-color: ${({ theme }) => theme.listBorder};
`;

const BookInfoContainer = styled.View`
    background-color : white;
    flex-direction: column;
`

const BookDetailInfoContainer = styled.View`
    background-color : white;
    flex-direction: row;
    padding-top : 10px;
    padding-bottom : 10px;
`

const BookTitleText = styled.Text`
    padding: 10px; 
    font-size : 14px;
    
`;
const BookInfoText = styled.Text`
    font-size : 10px;
    padding: 10px;
    color : gray;
`;

const LibraryNameText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left : 10px;
  margin-top : 7px;
`;

const StatusText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left : 10px;
  color : blue;
  padding-left : 232px;
  margin-top : 7px;s
`;

const PeriodText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left : 10px;
`;

const LateDayText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left : 10px;
  color : red;
  padding-left : 100px;
`;

const PriceText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-top : 10px;
  margin-left : 230px;
  color: ${({ theme }) => theme.listPrice};
`;

const ItemImageContainer = styled.Image`
    flex: 0.4;
    width : 100%;
    height: 100%;
    resizeMode: contain;
    margin-left : 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
    width: 90px;
    height : 26px;
    align-items: center;
    border-radius: 7px;
    padding: 5px;
    margin-top: 5px;
    margin-left : 20px;
    background-color: #3CB4EC;
`;

const ButtonTitle = styled.Text`
    font-size: 10px;
    color: ${({ theme}) => theme.buttonTitle};
`;

const Book = React.memo(
    ({ item: { bookId, bookThumbnail, bookTitle, canLoan, cartId } }) => {
  
      return (
          <BookContainer>
              <Image
                    source={{
                        uri: `${bookThumbnail}`,
                    }}
                />
                <BookInfoContainer>
                <BookTitleText>{bookTitle}</BookTitleText>
                    <BookDetailInfoContainer>
                <BookInfoText>나동빈</BookInfoText>
                <BookInfoText>한빛미디어</BookInfoText>
                    </BookDetailInfoContainer>
                </BookInfoContainer>
          </BookContainer>
      );
    }
);

const Item = React.memo(
  ({ item: { cartId, lateDateCount, libraryName, period, price, status } }) => {
    const [cartList, setCartList] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        try {
          axios({
            method: 'get',
            url: 'https://dev.delibook.shop/delibook/cart',
            headers: {
              'x-access-token': `${user?.token}`,
            },
          })
            .then(function (response) {
              const result = response.data.result;
              const list = [];
              for (let i = 0; i < result[0].length; i++) {
                list.push({
                  id: i,
                  cartId: result[0][i].cartId,
                  libraryId: result[0][i].libraryId,
                  library: result[0][i].library,
                  bookId: result[0][i].bookId,
                  bookThumbnail: result[0][i].bookThumbnail,
                  bookTitle: result[0][i].bookTitle,
                  canLoan: result[0][i].canLoan,
                  bookQuantity: result[0][i].bookQuantity,
                });
              }
              setCartList(list);
              return () => {};
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
      }, [user. cartId]);

    return (
        <Container>
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
            <BottomLibraryContainer>
                <PeriodText>기간 : {period}</PeriodText>
                <LateDayText>연체일 : {lateDateCount}</LateDayText>
            </BottomLibraryContainer>
                <PriceContainer>
                <PriceText>{price}원</PriceText>
                <ButtonContainer>
                    <ButtonTitle>반납 신청</ButtonTitle>
                </ButtonContainer>
                </PriceContainer>

            </ItemContainer>

        </Container>
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
            const result = response.data.result[0];
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
                keyExtractor={item => item['id'].toString()}
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
