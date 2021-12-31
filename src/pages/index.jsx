import React, { useCallback, useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, InteractionManager, Button, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactInterval from 'react-interval';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import { set as setTime } from '../store/time';
import { setCoordinates } from '../store/coordinates';

const REFRESH_COOLDOWN_DEVICE_TIME = 1000;

const Styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  CardContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, .7)',
  },
  ClockContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  Clock: {
    textAlign: 'center',
    fontSize: 40,
  },
  ClockMode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginLeft: 10,
  },
  InfoList: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  InfoListItem: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const Index = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.time.time);
  const currentArea = useSelector((state) => state.coordinates.area);
  const latitude = useSelector((state) => state.coordinates.latitude);
  const longitude = useSelector((state) => state.coordinates.longitude);
  const formatDate = useMemo(() => moment(time).format('HH:mm:ss'), [time]);
  const currentTimeMode = useMemo(() => {
    const hours = moment(time).hours();
    if (hours >= 0 && hours <= 4) return '새벽';
    if (hours >= 5 && hours <= 8) return '아침';
    if (hours >= 9 && hours <= 16) return '낮';
    if (hours >= 17 && hours <= 20) return '저녁';
    if (hours >= 21 && hours <= 23) return '밤';
  }, [moment(time).hours()]);

  const getCurrentTime = () => {
    dispatch(setTime(new Date()));
  };
  const getTodayWeather = (latitude, longitude) => {
    const domain = 'https://api.openweathermap.org/data/2.5/weather?';
    const queries = [
      `lat=${latitude}`,
      `lon=${longitude}`,
      `appid=${process.env.OPEN_WEATHER_API_KEY}`
    ].join('&');
    const endpoint = `${domain}${queries}`;
    return axios.get(endpoint);
  };
  const getCityName = (latitude, longitude) => {
    const key = process.env.GOOGLE_API_KEY;
    console.log(key);
    return axios.get(`https://www.googleapis.com/geolocation/v1/geolocate?key${key}`);
  };

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then((location) => {
      dispatch(setCoordinates(location.latitude, location.longitude));
      getTodayWeather(location.latitude, location.longitude)
      .then((result) => {
        console.log(result);
        // getCityName(location.latitude, location.longitude)
        //   .then((response) => {
        //     console.log(response);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
      })
      .catch((err) => {
        console.error(err);
      });
    }).catch(() => {
      Alert.alert('위치 권한 거부', '위치 권한을 할당하셔야 정상적인 앱 서비스를 이용하실 수 있습니다!');
    });
  }, []);

  return (
    <SafeAreaView
      style={Styles.SafeAreaView}
    >
      <ReactInterval
        timeout={REFRESH_COOLDOWN_DEVICE_TIME}
        enabled={true}
        callback={getCurrentTime}
      />
      <View
        style={Styles.CardContainer}
      >
        <View
          style={Styles.Card}
        >
          <View
            style={Styles.ClockContainer}
          >
            <Text
              style={Styles.Clock}
            >
              {formatDate}
            </Text>
            <Text
              style={Styles.ClockMode}
            >
              {currentTimeMode}
            </Text>
          </View>
          <View
            style={Styles.InfoList}
          >
            <View
              style={Styles.InfoListItem}
            >
              <Text>지역</Text>
              <Text>{latitude} {longitude}</Text>
            </View>
            <View
              style={Styles.InfoListItem}
            >
              <Text>현재 날씨</Text>
              <Text></Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
