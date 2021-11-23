/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';


const SetAddress = ({ navigation, route }) => {
  const [location, setLocation] = useState< ILocation | undefined>(undefined);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  
  
      return (  

        <View style={styles.container}>
          
          <Text style={styles.libname} > 지도에서 위치확인 </Text>
            

            <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,//위도 확대(1에 가까워질 수록 zoom out)
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
          
          
            <Button style= {styles.button} title="이 위치로 주소 설정" />
         

          
         </View>
      );
    

          
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
  button:{
    flex:0.2,
    fontSize:25,
    width:"90%",
    left:"5%",
    height:"10%",
  },
  //하단탭

});

export default SetAddress;*/
