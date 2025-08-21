import { createContext } from "react";
import { databases } from "../lib/appwrite";
import { useUser } from "../hooks/useUser";
import { ID } from "appwrite";
import { Permission, Role } from "react-native-appwrite";

// You should get this ID from the Appwrite console
const USERLESSONS_COLLECTION_ID = "68a7695b001860d47d17"; 
const DATABASE_ID = "68674c500017f2f643f6";

export const DoneContext = createContext();

export function DoneProvider({ children }) {
    const { user } = useUser();
    const newId = ID.unique();

    /**
     * Creates a new document in the user_lessons collection to record a completed lesson.
     * @param {string} lessonId The ID of the lesson that was completed.
     */
    async function completeLesson(lessonId) {
        if (!user) {
            console.error("User not authenticated. Cannot record completed lesson.");
            return;
        }

        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                USERLESSONS_COLLECTION_ID,
                ID.unique(), // genera un documentId único
                {
                    user_id: user.$id,
                    lessons: lessonId,
                    completed_at: new Date().toISOString()
                }
                );
            console.log("Lección completada registrada:", response);
            return response;
        } catch (error) {
            console.error("Error al registrar la lección completada:", error);
        }
    }

    return (
        <DoneContext.Provider value={{ completeLesson }}>
            {children}
        </DoneContext.Provider>
    );
}

