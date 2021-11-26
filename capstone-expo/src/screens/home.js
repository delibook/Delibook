import React, {useState, useCallback} from 'react';
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
  const [search, setSearch] = useState('');
  const testtext = '공지사항';

  const _handleSearchChange = (search) => {
    setSearch(search);
  };

  const _handleSearchSubmit = useCallback(async() => {
    
  }, []);

  return (
    <Container>
      <View style={styles.banner}>
        <Swiper autoplay={true} style={styles.wrapper} autoplayTimeout={3}>
          <View style={styles.slide1}>
            <Image style={styles.image} source = {require('../../assets/event_image1.jpg')} />
          </View>
          <View style={styles.slide2}>
          <Image style={styles.image} source = {require('../../assets/event_image2.jpg')} />
          </View>
          <View style={styles.slide3}>
          <Image style={styles.image} source = {require('../../assets/event_image3.jpg')} />
          </View>
        </Swiper>
      </View>
      <View style={{ flex: 0.4 }}>
        <SearchBar 
          value={search}
          onChangeText={_handleSearchChange}
          onSubmitEditing={_handleSearchSubmit}
          placeholder="검색어를 입력하세요"
        />
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
            onPress={() => navigation.navigate('도서관')}
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
            onPress={() => navigation.navigate('이용내역')}
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
        <HomePost text='딜리북 앱 지연현상 안내' />
        <HomePost text='개인정보처리방침 개정안내' />
        <HomePost text='딜리북 서비스 런칭 이벤트' />
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
  },
  slide2: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  banner: {
    flex: 0.7,
    height: 200,
    width: 350,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Home;
