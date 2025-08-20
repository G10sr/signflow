import { StyleSheet, Text, View, useColorScheme, Image } from 'react-native'
import React from 'react'
import ThemeView from '../../components/ThemeView'
import { useUser } from '../../hooks/useUser'
import ThemedText from '../../components/ThemeText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemeButton'
import { avatars } from '../../lib/appwrite';



const Account = () => {
  const { logout, user } = useUser();
  // fallback to email if name is missing
  const initialsName = user?.name || user?.email || '';
  // Remove # from color codes for Appwrite avatars endpoint
  const avatarUrl = avatars.getInitials(initialsName, 200, 200).href;

  return (
    <ThemeView style={styles.container}>
      <View style={styles.centerView}>
        <Image source={{ uri: avatarUrl }} style={styles.account} />

        <ThemedText title={true} style={styles.heading}>
          {user.name}
        </ThemedText>
        <Spacer />
        <ThemedText title={true} style={styles.heading}>
          {user.email}
        </ThemedText>

        <Spacer />
        <Spacer />
        
        <ThemedButton onPress={logout} title={"Logout"} style={styles.logoutButton}>
        </ThemedButton>
      </View>
    </ThemeView>
  );
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  account: {
    height: 200,
    width: 200,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    marginBottom: 60,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 40,
    alignSelf: 'stretch',
  },
});