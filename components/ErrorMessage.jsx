import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../const/colores'; 

export default function ErrorText({ children, style, ...props }) {
  const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <Text
      style={[styles.error(theme), style]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: (theme) => ({
    color: theme.errorColor,
    padding: 10,
    width:300,
    borderColor: theme.errorColor,
    borderWidth: 1,
    backgroundColor: theme.backgroudObj,
    borderRadius: 6,
    marginHorizontal: 60,
  }),
});
