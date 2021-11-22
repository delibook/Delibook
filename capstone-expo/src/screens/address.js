import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../components';
import { ProgressContext, UserContext } from '../contexts';
import axios from 'axios';

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Item = React.memo(
  ({
    item: {
      addressId,
      userId,
      detailAddress,
      address,
      latitude,
      longitude,
      isMain,
    },
  }) => {
    const { user } = useContext(UserContext);
    const _handleChangeMainAddress = useCallback(async () => {
      try {
        axios({
          method: 'patch',
          url: 'https://dev.delibook.shop/delibook/address/main/' + addressId,
          params: {},
          headers: {
            'x-access-token': `${user?.token}`,
          },
        })
          .then(function (response) {
            console.log(addressId);
          })
          .catch(function (error) {
            alert('Error', error);
            console.log(error);
          });
      } catch (e) {
        alert(addressId);
      } finally {
      }
    }, [user, addressId]);
    return (
      <View style={styles.item}>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.detailAddress}>{detailAddress}</Text>
        <View style={{ width: 50, alignItems: 'flex-end' }}></View>
      </View>
    );
  },
);

const Address = ({ navigation }) => {
  const [addressList, setAddressList] = useState();
  const [mainAddress, setMainAddress] = useState('');
  const [mainDetailAddress, setMainDetailAddress] = useState('');
  const [search, setSearch] = useState('');

  const { user } = useContext(UserContext);

  useEffect(() => {
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
          const list = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].isMain === 'non-main') {
              list.push({
                addressId: result[i].addressId,
                userId: result[i].userId,
                detailAddress: result[i].detailAddress,
                address: result[i].address,
                latitude: result[i].latitude,
                longitude: result[i].longitude,
                isMain: result[i].isMain,
              });
            } else {
              setMainAddress(result[i].address);
              setMainDetailAddress(result[i].detailAddress);
            }
          }
          console.log(list);
          setAddressList(list);
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

  const _handleItemPress = (params) => {
    console.log(params);
  };

  const _handleAddressSearchChange = (search) => {
    setSearch(search);
  };
  /*
  const _handleAddressSearchSubmit = useCallback(async () => {
    try {
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library/' + id + '/book',
        params: {
          search: `${search}`,
        },
        headers: {
          'x-access-token': `${user?.token}`,
        },
      })
        .then(function (response) {
          const result = response.data.result;
          const list = [];
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
        .catch(function (error) {
          console.log(error);
          alert('Error', error);
        });
    } catch (e) {
      console.log(e);
      alert('Error', e);
    } finally {
    }
  }, [search, user, setBooks]);

  */

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        onChangeText={_handleAddressSearchChange}
        onSubmitEditing={null}
        placeholder="주소명을 입력하세요"
      />
      <View style={styles.square}></View>
      <View style={styles.findAddress_GPS}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => console.log(`find address using GPS`)}
        >
          <MaterialIcons name="gps-fixed" size={20} color="#FFFFFF" />
          <Text style={styles.findAddress_text}>현재 위치로 주소 찾기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainAddress}>
        <Text style={styles.currentAddress}>{mainAddress}</Text>
        <Text style={styles.currentDetailAddress}>{mainDetailAddress}</Text>
      </View>
      <View style={styles.square}></View>
      <FlatList
        data={addressList}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />
      <View style={styles.square}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  square: {
    flex: 0.03,
    backgroundColor: '#EFEFEF',
    color: '#EFEFEF',
    minHeight: 15,
    zIndex: 10,
  },
  findAddress_GPS: {
    backgroundColor: '#30BDFF',
    borderRadius: 4,
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    marginLeft: 17,
    borderRadius: 4,
    paddingTop: 5,
    paddingRight: 12,
    paddingBottom: 5,
    paddingLeft: 12,
  },
  findAddress_text: {
    fontSize: 19,
    textAlign: 'center',
    letterSpacing: 0.05,
    color: '#FFFFFF',
    //border: 0.4px solid #FFFFFF;
  },
  mainAddress: {
    flex: 0.1,
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
  },
  currentAddress: {
    fontSize: 18,
    lineHeight: 25,
  },
  currentDetailAddress: {
    fontSize: 15,
    lineHeight: 15,
  },
  item: {
    flex: 0.2,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  item_texts: {
    left: 10,
    width: 220,
  },
  item_text: {
    lineHeight: 25,
  },
  address: {
    fontSize: 15,
    lineHeight: 15,
  },
  detailAddress: {
    fontSize: 12,
    lineHeight: 12,
  },
});

export default Address;
