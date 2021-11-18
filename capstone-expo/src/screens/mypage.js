import React, { useState, useRef, useEffect, useContext } from 'react';
import { Input } from '../components';
import * as Font from 'expo-font';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { UserContext } from '../contexts';
import axios from 'axios';
/*
const getFonts = () => {
  return Font.loadAsync({
    nanumB: require('../../assets/fonts/NanumSquareB.ttf'),
    nanumR: require('../../assets/fonts/NanumSquareR.ttf'),
  });
};
*/
const Mypage = ({ navigation }) => {
  //getFonts();

  const { dispatch, user } = useContext(UserContext);

  const [name, setName] = useState('');

  const _handleLogoutButtonPress = async () => {
    try {
    } catch (e) {
    } finally {
      dispatch({});
    }
  };

  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/user/my-page',
        headers: {
          'x-access-token': `${user?.token}`,
        },
      })
        .then(function (response) {
          const result = response.data.result[0];
          setName(result[0].userName);
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
  }, [setName, user]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.1, flexDirection: 'row', top: 50, left: 35 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            top: 7,
            fontWeight: '500',
          }}
        >
          님 안녕하세요!
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: 50,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Entypo
            onPress={() => navigation.navigate('Login')}
            style={{
              textAlign: 'center',
              top: 20,
              zIndex: 10,
            }}
            name="new-message"
            size={45}
            color="#75CBF3"
          />
          <Text style={{ top: 30, textAlign: 'center' }}>내 정보 수정 </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 100,
            flexDirection: 'column',
            borderColor: '#75CBF3',
            borderLeftWidth: 0.25,
            borderRightWidth: 0.25,
          }}
        >
          <Ionicons
            onPress={() => navigation.navigate('이용내역')}
            style={{
              textAlign: 'center',
              top: 20,
              zIndex: 10,
            }}
            name="receipt-outline"
            size={45}
            color="#75CBF3"
          />
          <Text style={{ top: 30, textAlign: 'center' }}>이용 내역</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <MaterialCommunityIcons
            onPress={() => navigation.navigate('Login')}
            style={{
              textAlign: 'center',
              top: 20,
              zIndex: 10,
            }}
            name="bookshelf"
            size={48}
            color="#75CBF3"
          />
          <Text style={{ top: 30, textAlign: 'center' }}>내 책장</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Login')}
        >
          <MaterialIcons
            style={{
              zIndex: 10,
              paddingRight: 10,
            }}
            name="delivery-dining"
            size={30}
            color="#75CBF3"
          />
          <Text style={{ fontSize: 17 }}>배달 주소 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Login')}
        >
          <AntDesign
            style={{
              zIndex: 10,
              paddingRight: 16,
            }}
            name="notification"
            size={25}
            color="#75CBF3"
          />
          <Text style={{ fontSize: 17 }}>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Login')}
        >
          <MaterialIcons
            style={{
              zIndex: 10,
              paddingRight: 16,
            }}
            name="question-answer"
            size={25}
            color="#75CBF3"
          />
          <Text style={{ fontSize: 17 }}>자주 하는 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.18,
            flexDirection: 'row',
            borderTopWidth: 0.25,
            borderColor: '#C2DEEB',
            alignItems: 'center',
            paddingLeft: 30,
            borderColor: '#75CBF3',
            borderBottomWidth: 0.25,
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons
            style={{
              zIndex: 10,
              paddingRight: 16,
            }}
            name="settings-outline"
            size={25}
            color="#75CBF3"
          />
          <Text style={{ fontSize: 17 }}>환경설정</Text>
        </TouchableOpacity>
      </View>
      <Button
        color="#a5a5a5"
        title="로그아웃"
        onPress={_handleLogoutButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    top: 30,
    zIndex: 10,
    justifyContent: 'space-between',
  },

  input: {
    marginTop: 10,
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#b6b6b6',
    borderRadius: 4,
    color: '#b6b6b6',
    padding: 16,
    fontSize: 16,
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
export default Mypage;
