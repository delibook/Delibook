import React from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//const Stack = createNativeStackNavigator();

const Join = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons
          onPress={() => console.log('click')}
          style={{
            textAlign: 'center',
            width: 20,
            height: 20,
            left: 15,
            top: 5,
            zIndex: 10,
          }}
          name="close"
          size={20}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: -15,
            fontSize: 17,
            fontWeight: '500',
          }}
        >
          회원가입
        </Text>
      </View>
      <ScrollView style={{ width: '100%', alignSelf: 'center', padding: 30 }}>
        <Text>이메일 주소</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
          placeholder="이메일 주소 입력"
        />
        <Text>비밀번호</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
        />
        <Text>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름 입력"
        />
        <Text>휴대폰 번호</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType={'phone-pad'}
          placeholder="하이픈(-)없이 입력"
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#b6b6b6',
    borderRadius: 3,
  },
  header: {
    padding: 15,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
  },
});

export default Join;
