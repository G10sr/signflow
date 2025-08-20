import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../const/colores';

const ThemedCard = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: '90%',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ThemedCard;
