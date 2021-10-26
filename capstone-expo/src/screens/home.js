import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import HomePost from '../components/HomePost';
import SearchBar from '../components/SearchBar';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 10px;
`;

const Home = ({ navigation }) => {
  const testtext = '공지사항';
  return (
    <Container>
      <View style={styles.banner}>
        <Swiper autoplay={true} style={styles.wrapper} autoplayTimeout={3}>
          <View style={styles.slide1}>
            <Image></Image>
          </View>
          <View style={styles.slide2}>
            <Image></Image>
          </View>
          <View style={styles.slide3}>
            <Image></Image>
          </View>
        </Swiper>
      </View>
      <View style={{ flex: 0.4 }}>
        <SearchBar />
      </View>
      <View style={{ flex: 0.7, flexDirection: 'row', top: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            borderColor: '#75CBF3',
            borderRightWidth: 0.5,
            height: 120,
          }}
        >
          <Ionicons
            onPress={() => navigation.navigate('대출')}
            style={{
              textAlign: 'center',
              top: 20,
              zIndex: 10,
            }}
            name="book"
            size={48}
            color="#75CBF3"
          />
          <Text style={{ top: 30, textAlign: 'center', fontSize: 20 }}>
            대출
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <MaterialCommunityIcons
            onPress={() => navigation.navigate('반납')}
            style={{
              textAlign: 'center',
              top: 20,
              zIndex: 10,
            }}
            name="truck-delivery"
            size={48}
            color="#75CBF3"
          />
          <Text style={{ top: 30, textAlign: 'center', fontSize: 20 }}>
            반납
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', top: 20 }}>
        <View
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1,
            borderColor: '#75CBF3',
          }}
        >
          <Text style={{ fontSize: 23, color: '#4B75A9', fontWeight: 'bold' }}>
            공지사항
          </Text>
        </View>
        <HomePost text={testtext} />
        <HomePost text={testtext} />
        <HomePost text={testtext} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: { borderRadius: 10 },
  slide1: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75CBF3',
  },
  slide2: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  banner: {
    flex: 0.5,
    height: 150,
    width: 300,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Home;
