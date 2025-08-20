import React from 'react';
import { ActivityIndicator as RNActivityIndicator, useColorScheme } from 'react-native';
import { Colors } from '../const/colores';
import ThemeView from './ThemeView';
import ThemedText from './ThemeText';

const CActivityIndicator = (props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>Loading</ThemedText>
      <RNActivityIndicator color={theme.text} {...props} />
    </ThemeView>
  );
};

export default CActivityIndicator;
