import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemeView from '../../components/ThemeView';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemeText';
import { databases } from '../../lib/appwrite';

const DATABASE_ID = "68674c500017f2f643f6";
const STATS_COLLECTION_ID = '68676a80000654274590';
const STATS_DOC_ID = '68676a80000654274591';

const Options = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const doc = await databases.getDocument(
          DATABASE_ID,
          STATS_COLLECTION_ID,
          STATS_DOC_ID
        );
        setStats(doc);
      } catch (e) {
        setError('No se pudieron cargar las estadísticas');
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <ThemeView style={styles.container}>
      <View style={styles.centerView}>
        <ThemedCard style={styles.card}>
          {loading && <ThemedText>Cargando...</ThemedText>}
          {error && <ThemedText>{error}</ThemedText>}
          {stats && (
            <>
              <ThemedText style={styles.title}>Estadísticas</ThemedText>
              {/* Muestra aquí los campos que tengas en tu documento stats */}
              {Object.entries(stats).map(([key, value]) => (
                key !== '$id' && key !== '$collectionId' && key !== '$databaseId' && key !== '$createdAt' && key !== '$updatedAt' ? (
                  <ThemedText key={key} style={styles.item}>{key}: {String(value)}</ThemedText>
                ) : null
              ))}
            </>
          )}
        </ThemedCard>
      </View>
    </ThemeView>
  );
};

export default Options;

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
  card: {
    minWidth: 300,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    marginVertical: 4,
  },
});