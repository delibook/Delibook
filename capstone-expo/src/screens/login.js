import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressContext } from '../contexts';
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
    let data;
    try {
      spinner.start();
      data = await axios.post('https://dev.delibook.shop/delibook/user/login', {
        email: `${email}`,
        password: `${password}`
      })
      .then(function(response){
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
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('Join')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
