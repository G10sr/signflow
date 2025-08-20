import { StyleSheet, View, Image, Touchable, TouchableOpacity} from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'
import ThemeText from '../components/ThemeText'
import ThemeView from '../components/ThemeView'
import ThemeButton from '../components/ThemeButton'


const index = () => {
const router = useRouter();

  return (
    <ThemeView>
        <View style={styles.welcomeView}>
            <ThemeText style={styles.title}>SignFlow</ThemeText>
            <Image
            source={require('../assets/favicon.png')}
            style={styles.logoimg}
            >
            </Image>
            <ThemeButton style={styles.buttons} title={'Inicia Sesion'} onPress={() => router.push('/login')}></ThemeButton>
            <ThemeButton style={styles.buttons} title={'Registrate'} onPress={() => router.push('/register')}></ThemeButton>

        </View>
    </ThemeView>
  )
}

export default index

const styles = StyleSheet.create({
    welcomeView:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    title:{
        alignSelf:'center',
        fontSize:48,
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
    }

})