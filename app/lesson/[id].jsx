import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ThemeView from "../../components/ThemeView";
import ThemedButton from "../../components/ThemeButton";
import ThemedText from "../../components/ThemeText";

const WithinLesson = () => {
    const {id} = useLocalSearchParams()

    return(
       <ThemeView style={styles.container}>
        <ThemedText>Lección {id}</ThemedText>
       </ThemeView>
    )

}
export default WithinLesson
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        marginTop:20
    }
})