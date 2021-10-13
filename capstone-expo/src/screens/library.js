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
  Dimensions,
  StatusBar,
  Alert,
  Animated as RNAnimated,
  Easing as RNAnimatedEasing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReAnimated, {
  Easing as ReAnimatedEasing,
} from 'react-native-reanimated';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const searchBarHeight = 50;
const topPosition = Constants.statusBarHeight;
const centerPosition = (height - searchBarHeight) / 2;

const useReanmiated = false;
const Animated = useReanmiated ? ReAnimated : RNAnimated;
const Easing = useReanmiated ? ReAnimatedEasing : RNAnimatedEasing;

const Library = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isOpened, setIsOpened] = React.useState(false);
  const animPosition = React.useRef(new Animated.Value(centerPosition));
  const animWidth = React.useRef();
  const animOpacity = React.useRef();
  const textRef = React.useRef();

  const onFocus = () => {
    setIsOpened(true);
    Animated.timing(animPosition.current, {
      toValue: topPosition,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const onBlur = () => {
    Animated.timing(animPosition.current, {
      toValue: centerPosition,
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start(() => setIsOpened(false));
  };

  animWidth.current = animPosition.current.interpolate({
    inputRange: [topPosition, centerPosition],
    outputRange: [width, width * 0.8],
  });

  animOpacity.current = animPosition.current.interpolate({
    inputRange: [0, centerPosition],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: animOpacity.current,
          backgroundColor: 'green',
          paddingTop: searchBarHeight,
          width: '100%',
          height: '100%',
        }}
      >
        {isOpened && (
          <ScrollView keyboardShouldPersistTaps={'always'}>
            {new Array(250).fill(Math.random()).map((val, index) => {
              return (
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginBottom: 2,
                  }}
                  key={val}
                  onPress={() => alert('press:' + index)}
                >
                  검색내역: {index}
                </Text>
              );
            })}
          </ScrollView>
        )}
      </Animated.View>

      <Animated.View
        style={{
          borderWidth: 1,
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          height: searchBarHeight,
          width: animWidth.current,
          top: animPosition.current,
        }}
      >
        <TextInput
          ref={textRef}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            backgroundColor: '#c8c8c8',
            width: '100%',
            height: '100%',
            paddingHorizontal: 10,
            fontSize: 14,
          }}
        />
        {isOpened && (
          <Animated.Text
            onPress={textRef.current.blur}
            style={{
              position: 'absolute',
              right: 10,
              padding: 10,
              opacity: animOpacity.current,
            }}
          >
            {'닫기'}
          </Animated.Text>
        )}
      </Animated.View>
      <View style={styles.navigation}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="도서관명을 입력해주세요."
        ></TextInput>
        <Ionicons
          onPress={() => console.log(`search`)}
          style={{
            textAlign: 'center',
            zIndex: 10,
          }}
          name="search-outline"
          size={35}
          color="#75CBF3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    top: 30,
    zIndex: 10,
    justifyContent: 'space-between',
  },
  navigation: {
    flexDirection: 'row',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    backgroundColor: 'white',
  },
  input: {
    flex: 0.96,
    marginTop: 10,
    marginBottom: 15,
    borderColor: '#E6F2F4',
    borderRadius: 14,
    backgroundColor: '#E6F2F4',
    color: '#b6b6b6',
    padding: 20,
  },
  touchable: {
    flex: 0.18,
    flexDirection: 'row',
    borderTopWidth: 0.25,
    borderColor: '#C2DEEB',
    alignItems: 'center',
    paddingLeft: 30,
  },
});
export default Library;
