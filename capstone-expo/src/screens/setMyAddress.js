import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Platform, Text, View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Button } from '../components';
import { UserContext } from '../contexts';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export default function App({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const _handleDetailAddressChange = (address) => {
    setDetailAddress(address);
  };
  const { user } = useContext(UserContext);

  const mApiKey = 'AIzaSyAfRg1F6PFrIfEtsRR7FiaKR90NGAMvg3s';
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!',
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(Number(location.coords.latitude));
      setLongitude(Number(location.coords.longitude));
      console.log(latitude);
    })();
    try {
      axios({
        method: 'fetch',
        url:
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          mApiKey +
          '&language=ko',
        params: {},
        headers: {},
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(
            'udonPeople ' + responseJson.results[0].formatted_address,
          );
        })
        .catch((err) => console.log('udonPeople error : ' + err));
    } finally {
    }
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const _handleSetAddressButtonPress = useCallback(async () => {
    try {
      axios({
        method: 'post',
        url: 'https://dev.delibook.shop/delibook/address/',
        params: {
          address: address,
          detailAddress: detailAddress,
          latitude: `${latitude}`,
          longitude: `${longitude}`,
        },
        headers: {
          'x-access-token': `${user?.token}`,
        },
      })
        .then(function (response) {
          if (response.isSuccess == false) {
            Alert.alert('Error', `${response.message}`);
          } else {
            Alert.alert('주소추가 완료');
            navigation.navigate('주소설정');
          }
          return response;
        })
        .catch(function (error) {
          alert('Error', error);
          console.log(error);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, [user, address, detailAddress, latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005, //위도 확대(1에 가까워질 수록 zoom out)
          longitudeDelta: 0.001, //경도 확대
        }}
      >
        <Marker
          pinColor="#1E90FF"
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
      <TextInput
        style={styles.input}
        value={detailAddress}
        onChangeText={_handleDetailAddressChange}
        placeholder="상세 주소 입력"
      />
      <Button
        title="이 위치를 주소로 설정"
        onPress={_handleSetAddressButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    flex: 0.6,
    top: 20,
    width: '100%',
    height: '100%',
  },
  input: {
    flex: 0.1,
    marginTop: 30,
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#b6b6b6',
    borderRadius: 4,
    color: 'black',
    paddingLeft: 10,
    fontSize: 16,
  },
});
