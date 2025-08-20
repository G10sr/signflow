import { StyleSheet, View, Image, Touchable, TouchableOpacity, TextInput, TouchableWithoutFeedback,Keyboard} from 'react-native'
import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react'
import ThemeText from '../../components/ThemeText'
import ThemeView from '../../components/ThemeView'
import ThemeButton from '../../components/ThemeButton'
import ErrorMessage from '../../components/ErrorMessage'
import ThemeTextInput from '../../components/ThemeTextInput';
import { useUser } from '../../hooks/useUser';
import Spacer from '../../components/Spacer';

const register = () => {
    const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [passwordConf, setPasswordconf]= useState('')
  const {register} = useUser()
  const [error, setError] = useState(null) 
  

  const submit = async () => {
    setError(null)

    if (password === passwordConf){
        try{
            await register(name, email, password)
        } catch(error){
            setError(error.message)
        }
    } else {
        setError("Las contraseñas no son iguales")
    }
        
  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemeView>
        <View style={styles.centerView}>
            <ThemeText style={styles.title} >Registro</ThemeText>
            <ThemeTextInput placeholder={'Nombre'} style={styles.input} onChangeText={setName} value={name} ></ThemeTextInput>
            <ThemeTextInput placeholder={'Email'} style={styles.input} onChangeText={setEmail} value={email} keyboardType={"email-address"}></ThemeTextInput>
            <ThemeTextInput placeholder={'Contraseña'} style={styles.input} onChangeText={setPassword} value={password} secureTextEntry></ThemeTextInput>
            <ThemeTextInput placeholder={'Confirmar contraseña'} style={styles.input} onChangeText={setPasswordconf} value={passwordConf} secureTextEntry></ThemeTextInput>

            <ThemeButton style={styles.buttons} title={'Continuar'} onPress={() => submit()}></ThemeButton>
            <Spacer />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Spacer />
            <Link href='/login'>
                <ThemeText style={{ textAlign: 'center' }}>Inicia Sesion</ThemeText>
            </Link>
            <View style={styles.accountsView}> 

                
            </View>
        </View>
    </ThemeView>
    </TouchableWithoutFeedback>
  )
}

export default register

const styles = StyleSheet.create({
    centerView:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    title:{
        alignSelf:'center',
        fontSize:32,
        marginBottom:30
    },
    logoimg:{
        height:200,
        width:200,
        alignSelf:'center',
        marginBottom:50
    },
    buttons:{
        width:300,
        marginBottom:10,
        alignSelf:'center',
    },
    input:{
        width:300,
        marginBottom:10,
        alignSelf:'center',
    },
    accountsView:{
        marginBottom:10,
        alignSelf:'center',
    }
})