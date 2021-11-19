import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-native';

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


const LoanHistory = () => {
    return (
        <Container>
            <ItemContainer>
            <TopLibraryContainer>
                <LibraryNameText>판교어린이도서관</LibraryNameText>
                <StatusText>대여중</StatusText>
            </TopLibraryContainer>
            <BookContainer>
                <ItemImageContainer
                    source={{
                        uri: `http://image.yes24.com/goods/91433923/XL`,
                    }}
                />
                <BookInfoContainer>
                <BookTitleText>이것이 코딩 테스트다</BookTitleText>
                    <BookDetailInfoContainer>
                <BookInfoText>나동빈</BookInfoText>
                <BookInfoText>한빛미디어</BookInfoText>
                    </BookDetailInfoContainer>
                </BookInfoContainer>
                </BookContainer>
                <BookContainer>
                    <ItemImageContainer
                        source={{
                            uri: `http://image.yes24.com/goods/91433923/XL`,
                        }}
                    />
                    <BookInfoContainer>
                        <BookTitleText>이것이 코딩 테스트다</BookTitleText>
                        <BookDetailInfoContainer>
                            <BookInfoText>나동빈</BookInfoText>
                            <BookInfoText>한빛미디어</BookInfoText>
                        </BookDetailInfoContainer>
                    </BookInfoContainer>
                </BookContainer>
            <BottomLibraryContainer>
                <PeriodText>기간 : 2021-10-01 ~ 2021-10-22</PeriodText>
                <LateDayText>연체일 : 22일</LateDayText>
            </BottomLibraryContainer>
                <PriceContainer>
                <PriceText>3500원</PriceText>
                <ButtonContainer>
                    <ButtonTitle>반납 신청</ButtonTitle>
                </ButtonContainer>
                </PriceContainer>

            </ItemContainer>

        </Container>
    );
};

export default LoanHistory;
