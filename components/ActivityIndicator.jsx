import React from 'react';
import { ActivityIndicator as RNActivityIndicator, useColorScheme } from 'react-native';
import { Colors } from '../const/colores';

const ActivityIndicator = (props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;
  return (
    <RNActivityIndicator color={theme.text} {...props} />
  );
};

export default ActivityIndicator;
