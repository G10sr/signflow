import { StyleSheet, View } from "react-native";
import { useEffect , useState } from "react";
import { useLessons } from "../../hooks/useLessons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { DoneContext } from "../../contexts/DoneContext";
import ThemeView from "../../components/ThemeView";
import ThemedButton from "../../components/ThemeButton";
import ThemedText from "../../components/ThemeText";
import CActivityIndicator from "../../components/CActivityInd";

const WithinLesson = () => {
    const [lesson, setLesson] = useState(null); // AQUI ESTAN LA LECCION REALIZANDOSE
    const [words, setWords] = useState([]); //AQUI ESTAN LAS PALABRAS
    const {id} = useLocalSearchParams()
    const { fetchLessonByID, fetchWordsByLessonID } = useLessons();
    const router = useRouter();
    const { completeLesson } = useContext(DoneContext);

     useEffect(() => {
        async function loadLessonAndWords() {
            try {
                // Carga los datos de la lección
                const lessonData = await fetchLessonByID(id);
                setLesson(lessonData);

                // Carga las palabras de la lección
                const wordsData = await fetchWordsByLessonID(id);
                setWords(wordsData);
            } catch (error) {
                console.log("Error loading lesson or words:", error);
            }
        }
        if (id) {
            loadLessonAndWords();
        }
        
    }, [id]);

    if (!lesson) {
        return <CActivityIndicator></CActivityIndicator>;
    }
    const handleCompleteLesson = async () => {
        try {
            await completeLesson(id);
            console.log("Lección marcada como completada.");
            router.push("/home");
        } catch (error) {
            console.error("No se pudo marcar la lección como completada:", error);
        }
    };
    return(
       <ThemeView style={styles.container}> 
            <ThemedText>Lección {id}</ThemedText>
                {words.length > 0 ? (
                words.map((wordDoc) => (
                    <ThemedText key={wordDoc.$id}>{wordDoc.word}</ThemedText>
                ))
            ) : (
                <ThemedText>No hay palabras para esta lección.</ThemedText>
            )}
            <View style={styles.buttonContainer}>
            <ThemedButton title="Terminar Lección" onPress={handleCompleteLesson} style={styles.button} />
            </View>
        </ThemeView>
    )

}
export default WithinLesson
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        paddingTop: 120
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,}
})