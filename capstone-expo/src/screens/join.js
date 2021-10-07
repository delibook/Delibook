import React from 'react';
import {
  Button,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const Join = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [allCheckbox, setAllCheckbox] = React.useState(false);
  const [checkbox1, setCheckbox1] = React.useState(false);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [checkbox3, setCheckbox3] = React.useState(false);
  const [checkbox4, setCheckbox4] = React.useState(false);
  const [checkbox5, setCheckbox5] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons
          onPress={() => navigation.navigate('Login')}
          style={{
            textAlign: 'center',
            width: 20,
            height: 20,
            left: 30,
            top: 10,
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
        <TouchableOpacity
          onPress={() => {
            setAllCheckbox(!allCheckbox);
            setCheckbox1(!checkbox1);
            setCheckbox2(!checkbox2);
            setCheckbox3(!checkbox3);
            setCheckbox4(!checkbox4);
            setCheckbox5(!checkbox5);
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
          <Text style={{ paddingLeft: 5, marginTop: 2, fontSize: 20 }}>
            전체동의
          </Text>
        </TouchableOpacity>
        <View style={styles.Checkboxes}>
          <TouchableOpacity
            onPress={() => {
              setCheckbox1(!checkbox1);
            }}
            style={{ flexDirection: 'row' }}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox1
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={{ paddingLeft: 5, marginTop: 2, fontSize: 20 }}>
              (필수)만 14세 이상입니다.
            </Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox2(!checkbox2);
            }}
            style={{ flexDirection: 'row' }}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox2
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={{ paddingLeft: 5, marginTop: 2, fontSize: 20 }}>
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
            style={{ flexDirection: 'row' }}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox3
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={{ paddingLeft: 5, marginTop: 2, fontSize: 20 }}>
              (필수)딜리북 이용약관 동의
            </Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckbox4(!checkbox4);
            }}
            style={{ flexDirection: 'row' }}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox4
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text style={{ paddingLeft: 5, marginTop: 2, fontSize: 20 }}>
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
            style={{ flexDirection: 'row' }}
          >
            <Image
              style={styles.Checkbox}
              source={
                checkbox5
                  ? require('../../assets/checkbox.png')
                  : require('../../assets/blank-check-box.png')
              }
            ></Image>
            <Text
              style={{
                paddingLeft: 5,
                marginTop: 2,
                fontSize: 20,
              }}
            >
              (필수)개인정보 제공 동의
            </Text>
            <Image
              style={styles.list}
              source={require('../../assets/list.png')}
            />
          </TouchableOpacity>
        </View>
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
    height: 60,
    top: 10,
    zIndex: 10,
    borderBottomWidth: 0.25,
    justifyContent: 'center',
  },
  Checkbox: {
    width: 25,
    height: 25,
    zIndex: 10,
  },
  Checkboxes: {
    flex: 0.5,
    height: 180,
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.25,
  },
  list: {
    width: 25,
    height: 25,
  },
});

export default Join;
