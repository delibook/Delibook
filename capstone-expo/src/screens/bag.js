import React, { useState, useEffect, useContext } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { UserContext } from '../contexts';
import axios from 'axios';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
/*
const getFonts = () => {
  return Font.loadAsync({
    nanumB: require('../../assets/fonts/NanumSquareB.ttf'),
    nanumR: require('../../assets/fonts/NanumSquareR.ttf'),
  });
};
*/
const Item = React.memo(
  ({
    item: {
      cartId,
      libraryId,
      library,
      bookId,
      bookThumbnail,
      bookTitle,
      canLoan,
      bookQuantity,
    },
    onPress,
  }) => {
    console.log(bookThumbnail);
    return (
      <View style={styles.item}>
        <Image source={require('')} style={styles.image} />
        <View style={{ left: 30 }}>
          <Text style={styles.item_text}>[제목]{bookTitle}</Text>
          <Text style={styles.item_text}>[상태]{canLoan}</Text>
          <Text style={styles.item_text}>[대여수량]{bookQuantity}</Text>
        </View>
        <EvilIcons
          onPress={() => console.log(`hi`)}
          style={styles.eraseIcon}
          name="close"
          size={20}
        />
      </View>
    );
  },
);

const Bag = ({ navigation }) => {
  //getFonts();
  const [libName, setLibName] = useState('');
  const [name, setName] = useState('');
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
          for (let i = 0; i < result.length; i++) {
            list.push({
              id: result[i].cartId,
              libraryId: result[i].libraryId,
              library: result[i].library,
              bookId: result[i].bookId,
              bookThumbnail: result[i].bookThumbnail,
              bookTitle: result[i].bookTitle,
              canLoan: result[i].canLoan,
              bookQuantity: result[i].bookQuantity,
            });
          }
          console.log(list);
          setCartList(list);
          return response.res;
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
  }, [user]);

  const _handleItemPress = (params) => {
    navigation.navigate('도서', params);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.libname}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
          }}
        >
          죽전도서관
        </Text>
      </View>

      <View style={styles.square}></View>
      <FlatList
        keyExtractor={(item) => item['id'].toString()}
        data={cartList}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />

      <View style={styles.more} onPress={() => console.log(`go borrow page`)}>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 25,
            textAlign: 'center',
            letterSpacing: 0.05,
            color: '#30BDFF',
          }}
        >
          + 더 담으러 가기
        </Text>
      </View>
      <View style={styles.square}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  libname: {
    flex: 0.07,
    justifyContent: 'center',
    padding: 15,
  },
  square: {
    flex: 0.03,
    backgroundColor: '#EFEFEF',
    minHeight: 15,
  },
  item: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  more: {
    flex: 0.08,
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  item_text: {
    lineHeight: 25,
  },
  eraseIcon: {
    left: 100,
    zIndex: 10,
  },
  touchable: {
    flex: 0.18,
    flexDirection: 'row',
    borderTopWidth: 0.25,
    borderColor: '#C2DEEB',
    alignItems: 'center',
    paddingLeft: 30,
  },
});
export default Bag;
