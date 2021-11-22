import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';



// 도서관 명, 해당 명에 따른 정보들 불러오기 , 


const Information = ({ navigation, route }) => { 
  const [name, setName] = useState('');
  const [cityName, setCityName] = useState('');
  const [sigunguName, setSigunguName] =useState('');
  const [closeDay, setCloseDay] =useState('');
  const [type, setType] =useState('');
  const [weekTime, setWeekTime] = useState('');
  const [satTime,setSatTime] = useState('');
  const [holidayTime , setHolidayTime]=useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [site, setSite] =useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [latitude, setLat] = useState();
  const [longitude, setLong] = useState();

  useEffect(() => {
    try {
      let libraryId = route.params.libraryId;
      axios({
        method: 'get',
        url: 'https://dev.delibook.shop/delibook/library/'+libraryId,
      })
      .then(function(response){
        const result = response.data.result[0];
        setName(result.name);
        setCityName(result.cityName);
        setCloseDay(result.closeDay);
        setHolidayTime(result.holidayTime);
        setType(result.type);
        setPhoneNumber(result.phoneNumber);
        setSigunguName(result.sigunguName);
        setSite(result.site);
        setWeekTime(result.weekTime);
        setRoadAddress(result.roadAddress);
        setSatTime(result.satTime);
        setLat(result.latitude);
        setLong(result.longitude);

      })
      .catch(function(error){
        console.log(error);
        alert("Error",error);
      });
    } catch (e) {
      console.log(e);
      alert("Error", e);
    } finally {
    }
  }, [route]);
  
      return (  
        <View style={styles.container}>
          
          <Text style={styles.libname} > {name}</Text>
            
          
          <View style={styles.content}>
            <Text style={styles.content}>도서관명: {name}</Text>
            <Text style={styles.content}>시군구명: {sigunguName}</Text>
            <Text style={styles.content}>도서관 유형: {type}</Text>
            <Text style={styles.content}>휴관일: {closeDay}</Text>
            <Text style={styles.content}>평일운영시간: {weekTime}   </Text>
            <Text style={styles.content}>토요일운영시간: {satTime}</Text>
            <Text style={styles.content}>공휴일운영시간: {holidayTime}</Text>
            <Text style={styles.content}>도서관 전화번호: {phoneNumber}</Text>
            <Text style={styles.content}>홈페이지: {site}</Text>
            <Text style={styles.content}>도서관 주소: {roadAddress}</Text>
          </View>

          <MapView style={styles.map}
                   provider={PROVIDER_GOOGLE}
                   region ={{latitude: `${latitude}`,
                             longitude: `${longitude}`,
                             latitudeDelta: 0.005, //위도 확대(1에 가까워질 수록 zoom out)
                             longitudeDelta: 0.001 //경도 확대
            }}>
              <Marker pinColor="#00c7ae" coordinate={{latitude: latitude, longitude: longitude}} /> 
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
    width:'90%',
    height:'100%',
    alignItems: 'center',
    top:'5%',
    left:'5%'
    
  },
  content:{
    flex:0.4,
    fontSize:15,
    left:'3%',
    color: 'grey',
  },
  //하단탭

});

export default Information;
