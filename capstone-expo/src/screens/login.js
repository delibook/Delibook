import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Alert, View, Text } from 'react-native';
import styled from 'styled-components';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressContext, UserContext } from '../contexts';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { spinner } = useContext(ProgressContext);
  const passwordRef = useRef();
  const insets = useSafeAreaInsets();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

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

  const _handleLoginButtonPress = useCallback(async() => {
    try {
      spinner.start();
      data = await axios.post('https://dev.delibook.shop/delibook/user/login', {
        email: `${email}`,
        password: `${password}`
      })
      .then(function(response){
        if (response.data.isSuccess == false) {
          Alert.alert("Error", `${response.data.message}`);
        } else {
          const token = response.data.result.jwt;
          console.log('토큰 : ', token);
          dispatch({ email, token});
        }
        return response.data;
      })
      .catch(function(error){
        alert("Error",error);
      });
    } catch (e) {
      alert(email);
    } finally {
      spinner.stop();
    }
  }, [email, password]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="이메일을 입력하세요"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="비밀번호를 입력하세요"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="로그인"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            containerStyle={{ height: 10, width: 90 }}
            title="아이디찾기"
            onPress={() => navigation.navigate('아이디찾기')}
            isFilled={false}
          />
          <Text style={{ top: 12, color: '#3679fe' }}>|</Text>
          <Button
            containerStyle={{ height: 10, width: 80 }}
            title="회원가입"    
            onPress={() => navigation.navigate('회원가입')}
            isFilled={false}
          />
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
