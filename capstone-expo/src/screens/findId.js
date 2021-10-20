import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
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

const FindId = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [disabled, setDisabled] = useState(true);
    const { spinner } = useContext(ProgressContext);
    const phoneRef = useRef();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setDisabled(!(name && phone));
    }, [name, phone]);

    const _handlePhoneChange = (phone) => {
        setPhone(phone);
    };
    
    const _handleNameChange = (name) => {
        setName(name);
    };

    const _handlePhoneAuthButtonPress = useCallback(async() => {
        try {
            spinner.start();
            data = await axios.post('https://dev.delibook.shop/delibook/user/phone/auth', {
                name: `${name}`,
                phoneNumber: `${phone}`
            })
            .then(function(response){
                if (response.data.isSuccess == false) {
                    Alert.alert("Error", `${response.data.message}`);
                } else {
                    navigation.navigate('휴대폰인증', {
                        name: `${name}`,
                        phone: `${phone}`
                    });
                }
                setDisabled(true);
                return response.data;
            })
            .catch(function(error){
                alert("Error",error);
            });
            } catch (e) {
            } finally {
              spinner.stop();
            }
        }, [name, phone]);

    return (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          extraScrollHeight={20}
        >
            <Container insets={insets}>
            <Input
                label="이름"
                value={name}
                onChangeText={_handleNameChange}
                onSubmitEditing={() => phoneRef.current.focus()}
                placeholder="이름을 입력하세요"
                returnKeyType="next"
            />
            <Input
                ref={phoneRef}
                label="휴대폰 번호"
                value={phone}
                onChangeText={_handlePhoneChange}
                onSubmitEditing={_handlePhoneAuthButtonPress}
                placeholder="하이픈(-)없이 입력"
                returnKeyType="done"
                keyboardType="phone-pad"
            />
            <Button
                containerStyle={{top: 20}}
                title="인증번호 받기"
                onPress={_handlePhoneAuthButtonPress}
                disabled={disabled}
            />
            <View>

            </View>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default FindId;
