import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import styled from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';
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

const Join = ({ navigation }) => {
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

  const _handleJoinButtonPress = useCallback(async() => {
    let data;
    try {
      data = await axios.post('https://dev.delibook.shop/delibook/user/sign-in', {
        name: `${name}`,
        phone: `${phone}`,
        email: `${email}`,
        password: `${password}`
      })
      .then(function(response){
        if (response.data.isSuccess == false) {
          Alert.alert("Error", `${response.data.message}`);
        } else {
          Alert.alert("회원가입", "성공");
          navigation.navigate('로그인');
        }
        return response.data;
      })
      .catch(function(error){
        alert("Error",error);
        console.log(error);
      });
    } catch (e) {
      alert(email);
    } finally {
    }
  }, [name, phone, email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons
          onPress={() => navigation.navigate('로그인')}
          style={{
            textAlign: 'center',
            width: 20,
            height: 20,
            left: 30,
            top: 21,
            zIndex: 10,
          }}
          name="close"
          size={20}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            fontWeight: '500',
          }}
        >
          회원가입
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1, width: '100%', alignSelf: 'center', padding: 30 }}
      >
        <Text style={styles.label}>이메일 주소</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={_handleEmailChange}
          keyboardType={'email-address'}
          placeholder="이메일 주소 입력"
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={_handlePasswordChange}
          placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
        />
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={_handleNameChange}
          placeholder="이름 입력"
        />
        <Text style={styles.label}>휴대폰 번호</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={_handlePhoneChange}
          keyboardType={'phone-pad'}
          placeholder="하이픈(-)없이 입력"
        />
        <TouchableOpacity
          onPress={() => {
            setAllCheckbox(true);
            setCheckbox1(true);
            setCheckbox2(true);
            setCheckbox3(true);
            setCheckbox4(true);
            setCheckbox5(true);
          }}
          style={{ flexDirection: 'row', paddingBottom: 15 }}
        >
          <Image
            style={styles.Checkbox}
            source={
              allCheckbox
                ? require('../../assets/checkbox.png')
                : require('../../assets/blank-check-box.png')
            }
          ></Image>
          <Text style={{ paddingLeft: 5, marginTop: 4, fontSize: 18 }}>
            전체동의
          </Text>
        </TouchableOpacity>
        <View style={styles.Checkboxes}>
          <TouchableOpacity
            onPress={() => {
              setCheckbox1(!checkbox1);
            }}
            style={styles.touchable}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox1
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={styles.checkText}>(필수)만 14세 이상입니다.</Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox2(!checkbox2);
            }}
            style={styles.touchable}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox2
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={styles.checkText}>
              (필수)개인정보 수집 및 이용동의
            </Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox3(!checkbox3);
            }}
            style={styles.touchable}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox3
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={styles.checkText}>(필수)딜리북 이용약관 동의</Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox4(!checkbox4);
            }}
            style={styles.touchable}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox4
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={styles.checkText}>
              (필수)전자금융거래 이용약관 동의
            </Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox5(!checkbox5);
            }}
            style={styles.touchable}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox5
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={styles.checkText}>(필수)개인정보 제공 동의</Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
        </View>
        <Button
          title="가입하기"
          onPress={_handleJoinButtonPress}
          disabled={disabled}
        />
      </ScrollView>
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
  header: {
    height: 60,
    top: 20,
    zIndex: 10,
    borderColor: '#d5d5d5',
    borderBottomWidth: 0.25,
    justifyContent: 'center',
  },
  Checkbox: {
    marginTop: 3,
    width: 20,
    height: 20,
    zIndex: 10,
  },
  Checkboxes: {
    flex: 1,
    height: 180,
    paddingTop: 15,
    paddingLeft: 20,
    marginBottom: 25,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.25,
  },
  list: {
    width: 20,
    height: 20,
  },
  checkText: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 1,
    fontSize: 18,
  },
  touchable: {
    flexDirection: 'row',
    paddingBottom: 7,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a6a6a6',
  },
});

export default Join;
