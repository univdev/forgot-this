import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { set as setTime } from '../store/time';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

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
  },
  Clock: {
    textAlign: 'center',
    fontSize: 40,
  },
  ClockMode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const Index = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.time.time);
  const formatDate = useMemo(() => moment(time).format('HH:mm:ss'), [time]);
  const currentTimeMode = useMemo(() => {
    const hours = moment(time).hours();
    if (hours >= 0 && hours <= 4) return '새벽';
    if (hours >= 5 && hours <= 8) return '아침';
    if (hours >= 9 && hours <= 16) return '낮';
    if (hours >= 17 && hours <= 20) return '저녁';
    if (hours >= 21 && hours <= 23) return '밤';
  }, [moment(time).format('HH')]);

  useEffect(() => {
    window.setInterval(() => {
      dispatch(setTime(moment(time).hours()));
    }, REFRESH_COOLDOWN_DEVICE_TIME);
  }, []);

  console.log(333);

  return (
    <SafeAreaView
      style={Styles.SafeAreaView}
    >
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
