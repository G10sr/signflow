import { TextInput,useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../const/colores';


const ThemeTextInput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.dark;
  return (
    <TextInput
    style={[
        {
            backgroundColor:theme.backgroudObj,
            color:theme.text,
            padding:20,
            borderRadius:100,
            borderWidth:2,
            borderColor:theme.text,

        },
        style,
    ]}
    placeholderTextColor={theme.text}
    {...props}
    
    ></TextInput>
  )
}

export default ThemeTextInput

