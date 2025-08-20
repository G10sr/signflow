import { StyleSheet, useColorScheme, View } from 'react-native';
import React from 'react';
import { Colors } from '../const/colores';

const ThemeView = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <View
      style={[{ backgroundColor: theme.backgroud, flex: 1 }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemeView;
