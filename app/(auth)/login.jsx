import { StyleSheet, View, Image, Touchable, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react'
import ThemeText from '../../components/ThemeText'
import ThemeView from '../../components/ThemeView'
import ThemeButton from '../../components/ThemeButton'
import ErrorMessage from '../../components/ErrorMessage'
import ThemeTextInput from '../../components/ThemeTextInput';
import { useUser } from '../../hooks/useUser';
import Spacer from '../../components/Spacer';
import CActivityIndicator from '../../components/CActivityInd';

const router= useRouter()


const login = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const {login} = useUser();
    const [error, setError] = useState(null) 
    
    const submit = async () => {
    setError(null)
    try{
        await login(email, password)
    } catch(error){
      setError(error.message)
    }
    }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemeView>
        <View style={styles.centerView}>
            <ThemeText style={styles.title}>Inicio de Sesion</ThemeText>
            <ThemeTextInput placeholder={'Email'} style={styles.input} onChangeText={setEmail} value={email} keyboardType={"email-address"}></ThemeTextInput>
            <ThemeTextInput placeholder={'Contraseña'} style={styles.input} onChangeText={setPassword} value={password} secureTextEntry></ThemeTextInput>
            
            <ThemeButton style={styles.buttons} title={'Continuar'} onPress={() => submit()}></ThemeButton>

            <Spacer />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Spacer />
            <Link href='/register'>
                <ThemeText style={{ textAlign: 'center' }}>Registrate</ThemeText>
            </Link>

            <View style={styles.accountsView}> 

                
            </View>
        </View>
    </ThemeView>
    </TouchableWithoutFeedback>
  )
}

export default login

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
    },
    
})