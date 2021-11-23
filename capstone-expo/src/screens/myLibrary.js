import React, { useContext, useState, useEffect, useCallback } from 'react';
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

const Item = React.memo(
    ({ item: { id, name, cityName, sigunguName, closeDay, type }, onPress }) => {
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
                </ItemRightContainer>
            </ItemContainer>
        );
    }
);

const MyLibrary = ({ navigation }) => {
    const [librarys, setLibrarys] = useState([]);
    const [distance, setDistance] = useState('');
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        try {
            axios({
                method: 'get',
                url: 'https://dev.delibook.shop/delibook/library/my-library',
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

    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id'].toString()}
                data={librarys}
                renderItem={({ item }) => (
                    <Item item={item} />
                )}
                windowSize={3}
            />
        </Container>
    );
};

export default MyLibrary;
