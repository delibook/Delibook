import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

const PhoneCode = ({ navigation, route }) => {
    const name = route.params.name;
    const phone = route.params.phone;
    const [code, setCode] = useState('');
    const [disabled, setDisabled] = useState(true);
    const { spinner } = useContext(ProgressContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setDisabled(!(code));
    }, [code]);

    const _handleCodeChange = (code) => {
        setCode(code);
    };

    const _handleVerifyCodeButtonPress = useCallback(async() => {
        try {
            spinner.start();
            const res = await axios({
                method: 'post',
                url: 'https://dev.delibook.shop/delibook/user/findId-form',
                data: {
                    name: `${name}`,
                    phoneNumber: `${phone}`,
                    verifyCode: `${code}`
                },
                params: {
                    name: `${name}`,
                    phoneNumber: `${phone}`,
                    verifyCode: `${code}`
                }
            })
            .then(function(response){
                console.log(response);
                if (response.data.isSuccess == false) {
                    Alert.alert("Error", `${response.data.message}`);
                } else {
                    navigation.navigate('아이디', {
                        email: `${response.data.result[0].email}`,
                    });
                }
                setDisabled(true);
                return response.res;
            })
            .catch(function(error){
                alert("Error",error);
            });
            } catch (e) {
                alert("Error", e);
            } finally {
              spinner.stop();
            }
    }, [name, phone, code]);

    return (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          extraScrollHeight={20}
        >
            <Container insets={insets}>
            <Input
                label="인증번호"
                value={code}
                onChangeText={_handleCodeChange}
                onSubmitEditing={_handleVerifyCodeButtonPress}
                placeholder="인증번호를 입력하세요"
                returnKeyType="done"
                keyboardType="number-pad"
            />
            <Button
                containerStyle={{top: 20}}
                title="확인"
                onPress={_handleVerifyCodeButtonPress}
                disabled={disabled}
            />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default PhoneCode;
