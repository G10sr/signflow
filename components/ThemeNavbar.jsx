import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from '../const/colores';

const ThemeNavbar = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;
  
  return (
    <View style={[styles.navbar, { backgroundColor: theme.backgroud }, style]}>
      {children}
    </View>
  );
};

export default ThemeNavbar;

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    flexDirection: 'row',
    height: 80,
    width: '100%',
    left: 0,
    bottom: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
