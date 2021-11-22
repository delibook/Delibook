import React,{ useState, useEffect }  from 'react';
import styled from 'styled-components';
import { Button ,FlatList,View, Text, StyleSheet} from 'react-native';
import axios from 'axios';


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
`;

const BookDetailInfoContainer = styled.View`
    background-color : white;
    flex-direction: row;
    padding-top : 10px;
    padding-bottom : 10px;
`;

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

const PeriodText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left : 10px;
`;



const ItemImageContainer = styled.Image`
    flex: 0.4;
    width : 100%;
    height: 100%;
    resizeMode: contain;
    margin-left : 10px;
`;
const styles = StyleSheet.create({
image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  item_texts: {
    left: 10,
    width: 220,
  },
  item_text: {
    lineHeight: 25,
  },
  libName: {
    fontSize:15
  },
});

const Item = React.memo(
    ({ item: { libraryName, category, bookTitle, thumbnail } }) => {
  
      return (
        <View>
          <Image
            source={{
              uri: `${Thumbnail}`,
            }}
            style={styles.image}
          />
          <Text style={styles.libName}> {libraryName}</Text>
          <View style={styles.item_texts}>
          
            <Text style={styles.item_text}>[제목] {bookTitle}</Text>
            <Text style={styles.item_text}>[카테고리] {category}</Text>
          </View>
          <View style={{ width: 50, alignItems: 'flex-end' }}>
            <EvilIcons
              onPress={_handleBookCancle}
              style={styles.eraseIcon}
              name="close"
              size={20}
            />
          </View>
        </View>
      );
    },
  );
const Bookcase = ({navigation,route}) => {
    const [likeList, setLikeList] = useState([]); 
    const userId =route.params.userId;
   
    useEffect(() => {
        try {
          axios({
            method: 'get',
            url: 'https://dev.delibook.shop/bookcase?userId='+userId,
            
          })
          .then(function(response){
            const result = response.data.result[0];
            const list=[];
            for (let i = 0; i < result[0].length; i++) {
                list.push({
                    id : i,
                    libraryName: result[0][i].libraryName,
                    category: result[0][i].category,
                    bookTitle: result[0][i].bookTitle,
                    thumbnail: result[0][i].thumbnail,
                  });               
             }
             console.log(list);
             setLikeList(list);
    
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
      }, [userId]);

    return (
        
        <Container>
            <ItemContainer>
           <BookContainer>
            <LibraryNameText>판교어린이도서관</LibraryNameText>
                <ItemImageContainer
                    source={{
                        uri: `http://image.yes24.com/goods/91433923/XL`,
                    }}
                />
                <BookInfoContainer>
                <FlatList
                keyExtractor={(item) => item['id'].toString()}
                data={likeList}
                renderItem={({ item }) => <Item item={item} />}
                 windowSize={3}
                 />
                </BookInfoContainer>
                </BookContainer>

                
            </ItemContainer>

        </Container>
    );
};

export default Bookcase;
