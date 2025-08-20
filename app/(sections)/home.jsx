import { Button, FlatList, Image, ScrollView , StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLessons } from '../../hooks/useLessons'
import ThemeView from '../../components/ThemeView'
import { Colors } from '../../const/colores'
import ThemedText from '../../components/ThemeText'
import ThemedButton from '../../components/ThemeButton'
import ThemedCard from '../../components/ThemedCard'
import { useRouter } from 'expo-router'

const Home = () => {
  const { lessons } = useLessons();
    const router = useRouter();

  return (
    <ThemeView>
      
        <FlatList
          style={styles.scrollview}
          contentContainerStyle={{ flexGrow: 1 }}
          data={lessons}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <ThemedCard style={styles.card}>
              <View style={styles.cardInner}>
                <View style={styles.cardContent}>
                  <ThemedText style={styles.title}>{item.title}</ThemedText>
                  <ThemedText style={styles.description}>{item.description}</ThemedText>
                </View>
                <View style={styles.buttonContainer}>
                  <ThemedButton title="Iniciar Lección" onPress={() => router.push(`/lesson/${item.$id}`)} style={styles.button} />
                </View>
              </View>
            </ThemedCard>
          )}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />      
    </ThemeView>
    
  )
}

export default Home

const styles = StyleSheet.create({
    scrollview:{
        marginTop:120, 
        flex: 1,
        width:'100%',
        paddingHorizontal: 5
    },
    card: {
        flex: 1,
        minHeight: 200,
        marginBottom: 20,
    },
    cardInner: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardContent: {
        flexShrink: 1,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        maxWidth: '80%',
        marginStart:10,
        marginTop:10,
        flexWrap: 'wrap',
    },
    description:{
        fontSize: 18,
        marginStart:10,
        marginTop:5,
        maxWidth: '80%',
        flexWrap: 'wrap',
    },
    button: {
        alignSelf: 'stretch',
    }
})