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
import { Button } from '../components';
import { validateEmail, removeWhitespace } from '../utils/common';
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

const Item = React.memo(({ item: { address, detailAddress } }) => {
  return (
    <View style={styles.item}>
      <View style={styles.mainAddress}>
        <Text style={styles.currentAddress}>{address}</Text>
        <Text style={styles.currentDetailAddress}>{detailAddress}</Text>
      </View>
      <View style={{ width: 50, alignItems: 'flex-end' }}>
        <EvilIcons
          onPress={() => console.log(`hi`)}
          style={{ zIndex: 10 }}
          name="close"
          size={20}
        />
      </View>
    </View>
  );
});

const Address = ({ navigation }) => {
  const [addressList, setAddressList] = useState();
  const [mainAddress, setMainAddress] = useState('');
  const [mainDetailAddress, setMainDetailAddress] = useState('');
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
            list.push({
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

  return (
    <View style={styles.container}>
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
      <FlatList>
        keyExtractor={(item) => item.toString()}
        data={addressList}
        renderItem=
        {({ item }) => <Item item={item} onPress={_handleItemPress} />}
        windowSize={3}
      </FlatList>
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
    flex: 0.08,
    flexDirection: 'column',
    alignItems: 'center',
  },
  findAddress_text: {
    fontSize: 19,
    textAlign: 'center',
    letterSpacing: 0.05,
    color: '#FFFFFF',
    //border: 0.4px solid #FFFFFF;
  },
  mainAddress: {
    flex: 0.08,
    justifyContent: 'center',
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
    flexDirection: 'row',
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
});

export default Address;
