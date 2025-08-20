import { Image, StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import React from 'react';
import { Slot, usePathname } from 'expo-router';
import ThemeImg from '../components/ThemeImg';
import ThemeNavbar from '../components/ThemeNavbar';
import { useRouter } from 'expo-router';
import { Colors } from '../const/colores';
import { UserProvider } from '../contexts/UserContext';
import UserOnly from '../components/auth/UserOnly';
import GuestOnly from '../components/auth/GuestOnly';
import { LessonsProvider } from '../contexts/LessonsContext';

export default function RootLayout() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.dark;
    const pathname = usePathname();


    // Esconde el layout, unicamente usar en index. Usar mismo sistema en otro lugar para hidelayout
    const mainframe = pathname === '/' 

    if (mainframe){
      return (
      <UserProvider>
      <GuestOnly>

      <Slot />
      </GuestOnly>

      </UserProvider>
      )
    }
    const justlogo = pathname === '/login' || pathname === "/register" || pathname.startsWith("/lesson/");
    if (justlogo){
      return (
    <UserProvider>
      <UserOnly>
        <LessonsProvider>
        <View style={{ flex: 1 }}>
          <Slot />
          <Text style={[styles.titulo, { color: theme.title }]}>SignFlow</Text>
        </View>
        </LessonsProvider>
      </UserOnly>
    </UserProvider>
      )
    }

    // Layout
  return (
    <UserProvider>
          <UserOnly>
            <LessonsProvider>
    <View style={{ flex: 1 }}>
      <Slot />
      <Text style={[styles.titulo, { color: theme.title }]}>SignFlow</Text>
      <ThemeNavbar>
         <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
              <ThemeImg
                source={require('../assets/icons/hogar.png')}
                active={pathname === '/home'}
              />
             </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => router.push('/account')}>
              <ThemeImg
                source={require('../assets/icons/usuario.png')}
                active={pathname === '/account'} // aún sin ruta asignada
              />
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => router.push('/options')}>
              <ThemeImg
                source={require('../assets/icons/ajustes-deslizadores.png')}
                active={pathname === '/options'}
              />
         </TouchableOpacity>
      </ThemeNavbar>
    </View>
                </LessonsProvider>

        </UserOnly>

    </UserProvider>
  );
}

const styles = StyleSheet.create({
  titulo: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 30,
    fontWeight: 'bold',
    },
  button: {
    height: 35,
    width: 35,
    marginBottom:12
    }
});
