import { Text, StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import { Colors } from '../const/colores';

const ThemedText = ({ style, active, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <Text
      style={[
        styles.text,
        { color: theme.text },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
