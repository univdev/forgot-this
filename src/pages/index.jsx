import React, { useCallback, useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactInterval from 'react-interval';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import { set as setTime } from '../store/time';
import { setCoordinates, setArea } from '../store/coordinates';
import { setCurrent as setCurrentWeather } from '../store/weather';

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
  const weather = useSelector((state) => state.weather.current);
  const formatDate = useMemo(() => moment(time).format('HH:mm:ss'), [time]);
  const currentTimeMode = useMemo(() => {
    const hours = moment(time).hours();
    if (hours >= 0 && hours <= 4) return '??????';
    if (hours >= 5 && hours <= 8) return '??????';
    if (hours >= 9 && hours <= 16) return '???';
    if (hours >= 17 && hours <= 20) return '??????';
    if (hours >= 21 && hours <= 23) return '???';
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

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then((location) => {
      dispatch(setCoordinates(location.latitude, location.longitude));
      getTodayWeather(location.latitude, location.longitude)
      .then(({ data }) => {
        const area = data.name;
        const weathers = data.weather;
        const currentWeather = weathers[0];
        dispatch(setArea(area));
        dispatch(setCurrentWeather(currentWeather.description));
      })
      .catch((err) => {
        console.error(err);
      });
    }).catch(() => {
      Alert.alert('?????? ?????? ??????', '?????? ????????? ??????????????? ???????????? ??? ???????????? ???????????? ??? ????????????!');
    });
  }, []);

  const handleShowCoordinates = () => {
    return Alert.alert('?????? ????????? ??????', `Latitude: ${latitude}\nLongitude: ${longitude}`);
  };

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
              <Text>??????</Text>
              <Text
                onPress={handleShowCoordinates}
              >
                {currentArea}
              </Text>
            </View>
            <View
              style={Styles.InfoListItem}
            >
              <Text>?????? ??????</Text>
              <Text>{weather}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
