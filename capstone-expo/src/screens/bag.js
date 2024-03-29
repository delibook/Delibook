import React, { useState, useEffect, useContext, useCallback } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { UserContext } from '../contexts';
import axios from 'axios';
import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
} from 'react-native';

const Item = React.memo(
  ({ item: { bookId, bookThumbnail, bookTitle, canLoan, putQuantity, cartId } }) => {
    const { user } = useContext(UserContext);

    const _handleBookCancle = useCallback(async () => {
      try {
        axios({
          method: 'patch',
          url: 'https://dev.delibook.shop/delibook/cart/' + cartId + '/drop',
          params: {
            bookId: `${bookId}`,
          },
          headers: {
            'x-access-token': `${user?.token}`,
          },
        })
          .then(function (response) {
            console.log(bookId, cartId);
          })
          .catch(function (error) {
            alert('Error', error);
            console.log(error);
          });
      } catch (e) {
        alert(cartId);
      } finally {
      }
    }, [user, bookId, cartId]);

    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: `${bookThumbnail}`,
          }}
          style={styles.image}
        />
        <View style={styles.item_texts}>
          <Text style={styles.item_text}>[제목] {bookTitle}</Text>
          <Text style={styles.item_text}>[상태] {canLoan}</Text>
          <Text style={styles.item_text}>[대여수량] {putQuantity}</Text>
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

const Bag = ({ navigation }) => {
  const [libName, setLibName] = useState('');
  const [cartList, setCartList] = useState([]);
  const [mainAddress, setMainAddress] = useState('');
  const [mainDetailAddress, setMainDetailAddress] = useState('');
  const [cost, setCost] = useState('');
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
              putQuantity: result[0][i].putQuantity,
            });
          }
          setCost(result[result.length - 1][0].cost);
          setCartList(list);
          setLibName(list[0].library);
          return () => {};
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert('Error', e);
    } finally {
    }

    try {
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/address',
        headers: {
          'x-access-token': `${user?.token}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;
          const ls = [];
          for (let i = 0; i < result.length; i++) {
            ls.push({
              addressId: result[i].addressId,
              userId: result[i].userId,
              detailAddress: result[i].detailAddress,
              address: result[i].address,
              latitude: result[i].latitude,
              longitude: result[i].longitude,
              isMain: result[i].isMain,
            });
            if (result[i].isMain === 'main') {
              setMainAddress(result[i].address);
              setMainDetailAddress(result[i].detailAddress);
            }
          }
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
  }, [user]);

  const _handleLoanPayment = useCallback(async () => {
    try {
      axios({
        method: 'post',
        url: 'https://dev.delibook.shop/delibook/loan',
        params: {
          item_name: `${cartList[0].bookTitle} 외 ${cartList.length - 1}개`,
          quantity: `${cartList.length}`,
          price: `${cost}`,
          cartId: `${cartList[0].cartId}`,
        },
        headers: {
          'x-access-token': `${user?.token}`,
        },
      })
        .then(function (response) {
          const url = response.data;
          console.log(url);
          const supported = Linking.canOpenURL(url);

          if (supported) {
            Linking.openURL(url);
            navigation.navigate('주문완료');
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        })
        .then(function (response) {
          const result = response.data;
          setUrl(result);
          return response.data;
        })
        .catch(function (error) {
          alert('Error', error);
        });
    } catch (e) {
      alert(cartId);
    } finally {
    }
  }, [user, cost, cartList]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.libname}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
          }}
        >
          {libName}
        </Text>
      </View>

      <View style={styles.square}></View>

      <FlatList
        keyExtractor={(item) => item['id'].toString()}
        data={cartList}
        renderItem={({ item }) => <Item item={item} />}
        windowSize={3}
      />

      <View style={styles.more}>
        <Button
          color="#30BDFF"
          title="+더 담으러 가기"
          onPress={() => navigation.navigate('도서관')}
        />
      </View>
      <View style={styles.square}></View>
      <View style={styles.delivery}>
        <View style={styles.address}>
          <Text style={styles.mainAddressText}>{mainAddress}(으)로 배달</Text>
          <Text style={styles.mainDetailAddressText}>{mainDetailAddress}</Text>
        </View>
        <View style={styles.modify}>
          <Button
            color="#30BDFF"
            title="수정"
            onPress={() => console.log(`modify main address`)}
          />
        </View>
      </View>
      <View style={styles.payment}>
        <View style={styles.payway}>
          <Text style={{ fontSize: 20, lineHeight: 25 }}>결제수단</Text>
          <Text style={{ fontSize: 15, lineHeight: 25 }}>카카오페이</Text>
        </View>
        <EvilIcons
          onPress={() => console.log(`change way of payment`)}
          style={styles.navigateIcon}
          name="chevron-right"
          color="#30BDFF"
          size={50}
        />
      </View>
      <TouchableOpacity style={styles.pay} onPress={_handleLoanPayment}>
        <Text style={styles.pay_text}>{cost}원 결제하기</Text>
      </TouchableOpacity>
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
  eraseIcon: {
    zIndex: 10,
  },
  more: {
    flex: 0.08,
    alignItems: 'center',
    padding: 8,
  },
  delivery: {
    flex: 0.2,
    flexDirection: 'row',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    padding: 10,
  },
  address: {
    width: 290,
  },
  mainAddressText: {
    fontSize: 20,
  },
  mainDetailAddressText: {
    fontSize: 15,
    color: '#A6A6A6',
  },
  modify: {
    fontSize: 18,
    color: '#30BDFF',
    left: 15,
    top: 15,
  },
  payment: {
    flex: 0.2,
    flexDirection: 'row',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    padding: 10,
  },
  payway: {
    width: 290,
  },
  navigateIcon: {
    zIndex: 10,
    left: 15,
    top: 5,
  },
  pay: {
    backgroundColor: '#30BDFF',
    alignItems: 'center',
    borderRadius: 4,
    flex: 0.3,
    padding: 20,
  },
  pay_text: {
    fontSize: 19,
    lineHeight: 25,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.05,
    color: '#FFFFFF',
    //border: 0.4px solid #FFFFFF;
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
