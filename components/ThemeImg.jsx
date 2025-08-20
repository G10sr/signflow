import { Image, StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import { Colors } from '../const/colores';

const ThemeImg = ({ style,active, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <Image
      style={[styles.img,{tintColor: active ? theme.navbaricActive : theme.navbaric},style,]}{...props}
    />
  );
};

export default ThemeImg;

const styles = StyleSheet.create({
  img: {
    width: 35,
    height: 35,
  },
});
