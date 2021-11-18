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

const LibraryContainer = styled.View`
    background-color : white;
    flex : 1;
    flex-direction: column;
    margin-bottom : 20px;
    width : 100%
    
`;

const BookContainer = styled.View`
    background-color : white;
    flex-direction: row;
    margin-bottom : 10px;
    width : 100%;
    padding : 10px;
    border-bottom-width: 1px;
    height : 120px;
    border-color: ${({ theme }) => theme.listBorder};
`;

const BookTitleText = styled.Text`
    font-size : 12px;
`;
const BookInfoText = styled.Text`
    font-size : 7px;
`;

const StyledText = styled.Text`
  font-size: 10px;
  margin-bottom: 10px;
  margin-left : 10px;
`;

const ItemImageContainer = styled.Image`
    flex: 1;
    width: 100%;
    height: 100%;
    resizeMode: contain;
    margin-right: 10px;
    margin-left : 0;
`;

const ButtonContainer = styled.TouchableOpacity`
   
    width: 90px;
    align-items: center;
    border-radius: 7px;
    padding: 5px;
    margin-top: 5px;
    margin-right: 30px;
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
            <LibraryContainer>
                <StyledText>판교어린이도서관</StyledText>
                <StyledText>대여중</StyledText>
                <BookContainer>
                    <ItemImageContainer
                        source={{
                            uri: `http://image.yes24.com/goods/91433923/XL`,
                        }}

                    />
                    <BookTitleText>이것이 코딩 테스트다</BookTitleText>
                    <BookInfoText>나동빈</BookInfoText>
                    <BookInfoText>한빛미디어</BookInfoText>
               </BookContainer>
                <BookContainer>
                    <ItemImageContainer
                        source={{
                            uri: `http://image.yes24.com/goods/91433923/XL`,
                        }}
                    />
                </BookContainer>
                <StyledText>기간 : 2021-10-01 ~ 2021-10-22</StyledText>
                <StyledText>연체일 : 22일</StyledText>
                <StyledText>3500원</StyledText>
                <ButtonContainer>
                    <ButtonTitle>반납 신청</ButtonTitle>
                </ButtonContainer>
            </LibraryContainer>
            </ItemContainer>
        </Container>
    );
};

export default LoanHistory;
