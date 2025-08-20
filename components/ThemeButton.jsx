import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import { Colors } from '../const/colores';
const ThemedButton = ({ title, style, textStyle, active, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: active ? theme.buttonActive : theme.button,
        },
        style,
      ]}
      {...props}
    >
      {children
        ? React.Children.map(children, child =>
            React.cloneElement(child, {
              style: [
                styles.text,
                { color: active ? theme.buttonTextActive : theme.buttonText },
                textStyle,
                child.props?.style,
              ],
            })
          )
        : (
            <Text
              style={[
                styles.text,
                { color: active ? theme.buttonTextActive : theme.buttonText },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}
    </TouchableOpacity>
  );
}

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999, // Estilo redondo como ChatGPT
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
