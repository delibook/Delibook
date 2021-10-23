import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ShowId = ({ navigation, route }) => {
    const email = route.params.email;
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAwareScrollView
         contentContainerStyle={{ flex: 1 }}
         extraScrollHeight={20}
        >
            <Container insets={insets}>
                <View style={{borderWidth: 1, borderRadius: 5}}>
                    <Text style={{ marginHorizontal: 30, marginVertical: 10}}>{email}</Text>
                </View>
                <Button
                containerStyle={{top: 20}}
                title="로그인페이지로 이동"
                onPress={() => navigation.navigate('로그인')}
                />
            </Container>
        </KeyboardAwareScrollView>
    );    
};

export default ShowId;
