import React, { useContext, useState, useEffect } from 'react';
import { View,Text,FlatList,StyleSheet } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
import { MapView } from 'expo';
import axios from'axios';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAt5c5qD37duKCVYw-LQOrFW3lnLXWW48c" async ></script>
// &callback=initMap&libraries=&v=weekly



// 도서관 명, 해당 명에 따른 정보들 불러오기 , 


const Information = () => { 
  
      return (  
        <View style={styles.container}>
          
          <Text style={styles.libname} > 판교어린이 도서관</Text>
            
          
          <View style={styles.content}>
            <Text style={styles.content}>   도서관명:</Text>
            <Text style={styles.content}>   시군구명: </Text>
            <Text style={styles.content}>   도서관 유형: </Text>
            <Text style={styles.content}>   휴관일: </Text>
            <Text style={styles.content}>   평일운영시간:   </Text>
            <Text style={styles.content}>   토요일운영시간: </Text>
            <Text style={styles.content}>   공휴일운영시간: </Text>
            <Text style={styles.content}>   도서관 전화번호: </Text>
            <Text style={styles.content}>   홈페이지: </Text>
            <Text style={styles.content}>   도서관 주소: </Text>
          </View>

          <MapView style={styles.map}
                   provider={PROVIDER_GOOGLE}
                   region ={{latitude:37.505969,
                             longitude:127.05186
            }}>
              <Marker pinColor="#00c7ae" coordinate={{latitude: 37.505969, longitude: 127.05186}} /> 
            </MapView>
         </View>
      );
    
  
     /*<View style={{ flex: 1 }}>
     <MapView style={styles.map}
      provider={PROVIDER_GOOGLE} 
      initialRegion={{ 
          latitude: {lat}, 
          longitude: {long}, 
          
        }}>
          <Marker
          coordinate={{ latitude: {lat}, longitude: {long} }}
          title="marker"
          
        />
      </MapView>
        */
          
};



const styles = StyleSheet.create({
  //이런식으로써 
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  libname: {
    flex: 0.07,
    padding: 25,
    fontSize: 25,
    textAlign: 'center',
  },
  topTap: {
   flex: 0.1,
  },
  map:{
    flex:0.4,
    width:'50%',
    height:'50%',
  },
  content:{
    flex:0.4,
    fontSize:15
  },
  //하단탭

});

export default Information;
