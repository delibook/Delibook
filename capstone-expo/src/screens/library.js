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
  Pressable,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Library = ({ navigation }) => {
  const [libName, setLibName] = useState('');
  const [name, setName] = useState('판교어린이도서관');
  const [addr, setAddr] = useState('경기도 성남시');
  const [rest, setRest] = useState('공휴일');
  const [price, setPrice] = useState('1000원');

  return (
    <View style={styles.container}>
      <View style={styles.searchButton}>
        <Pressable
          style={styles.input}
          value={libName}
          onChangeText={setLibName}
        >
          <TextInput
            style={{
              left: 20,
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d5d5d5',
            }}
            placeholder="도서관명을 입력해주세요."
          ></TextInput>
          <Ionicons
            onPress={() => console.log(`search`)}
            style={{
              zIndex: 10,
              right: 10,
              top: 8,
            }}
            name="search-outline"
            size={25}
            color="#75CBF3"
          />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('Mypage')}
        >
          <Text style={{ fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>{addr}</Text>
            <Text>공공도서관</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}
          >
            <Text>휴관일 | {rest}</Text>
            <Text style={{ color: '#3679fe' }}>{price}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  searchButton: {
    flexDirection: 'row',
    flex: 0.1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    flex: 0.96,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
    borderColor: '#E6F2F4',
    borderRadius: 10,
    backgroundColor: '#E6F2F4',
    color: '#b6b6b6',
    justifyContent: 'space-between',
    width: 327,
    height: 42,
  },
  touchable: {
    flex: 0.18,
    borderColor: '#C2DEEB',
    paddingLeft: 40,
    paddingRight: 40,
    borderBottomWidth: 0.25,
  },
});
export default Library;
