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

const Address = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [allCheckbox, setAllCheckbox] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    setDisabled(!(email && password && name && phone && !errorMessage));
  }, [email, password, name, phone, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : '이메일 형식이 잘못되었습니다.',
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const _handleNameChange = (name) => {
    setName(name);
  };

  const _handleJoinButtonPress = useCallback(async () => {
    let data;
    try {
      data = await axios
        .post('https://dev.delibook.shop/delibook/user/sign-in', {
          name: `${name}`,
          phone: `${phone}`,
          email: `${email}`,
          password: `${password}`,
        })
        .then(function (response) {
          if (response.data.isSuccess == false) {
            Alert.alert('Error', `${response.data.message}`);
          } else {
            Alert.alert('회원가입', '성공');
            navigation.navigate('로그인');
          }
          return response.data;
        })
        .catch(function (error) {
          alert('Error', error);
          console.log(error);
        });
    } catch (e) {
      alert(email);
    } finally {
    }
  }, [name, phone, email, password]);

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
      <View style={styles.square}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#b6b6b6',
    borderRadius: 4,
    color: '#b6b6b6',
    paddingLeft: 10,
    fontSize: 16,
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
    flex: 0.07,
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a6a6a6',
  },
});

export default Address;
