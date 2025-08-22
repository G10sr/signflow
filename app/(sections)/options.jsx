import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemeView from '../../components/ThemeView';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemeText';
import ThemedText2 from '../../components/ThemeText2';
import { useDone } from '../../hooks/useDone';
import CActivityIndicator from '../../components/CActivityInd';

const Options = () => {
  const { getUsersLessons } = useDone();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
   const [loading, setLoading] = useState(true); // 👈 estado de carga

  useEffect(() => {
    (async () => {
      try {
        const lessons = await getUsersLessons();

        const grouped = {};
        lessons.forEach((item) => {
          const key = typeof item.lessons === "object" ? item.lessons.title : item.lessons;
          if (!grouped[key]) {
            grouped[key] = { ...item, count: 1 };
          } else {
            grouped[key].count += 1;
          }
        });

        const groupedArray = Object.values(grouped);
        setData(groupedArray);
        setFiltered(groupedArray);
      } finally {
        setLoading(false); // 👈 dejar de cargar
      }
    })();
  }, []);

  if (loading) {
    return (
      <CActivityIndicator></CActivityIndicator>
    );
  }

    return (
    <ThemeView>    

      <FlatList
        style={styles.scrollview}
        contentContainerStyle={{ flexGrow: 1 }}
        data={filtered}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ThemedCard style={styles.card}>
            <View style={styles.cardInner}>
              <View style={styles.cardContent}>
                <ThemedText style={styles.title}>
                  {typeof item.lessons === "object" ? item.lessons.title : item.lessons}
                </ThemedText>
                <ThemedText style={styles.date}>
                  Última completada: {new Date(item.completed_at).toLocaleString()}
                </ThemedText>

                <ThemedText2 style={styles.meta}>{item.count} <ThemedText style={styles.littletext}>veces completada</ThemedText></ThemedText2>
              </View>
            </View>
          </ThemedCard>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </ThemeView>
  );
};

export default Options;

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
        paddingStart:10,
        paddingEnd:10
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
    meta:{
      alignSelf: "center",
      fontSize:70,
      fontWeight:"800",
      marginEnd:30,
      
    }, 
    date:{
      marginStart:10,
      fontSize:12
    }
});
