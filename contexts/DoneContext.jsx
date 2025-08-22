import { createContext } from "react";
import { databases } from "../lib/appwrite";
import { useUser } from "../hooks/useUser";
import { Query, ID } from "appwrite";

const USERLESSONS_COLLECTION_ID = "68a7695b001860d47d17";
const DATABASE_ID = "68674c500017f2f643f6";

export const DoneContext = createContext();

export function DoneProvider({ children }) {
  const { user } = useUser();

  // registra una lección completada
  async function completeLesson(lessonId) {
    if (!user) return console.error("User not authenticated");
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        USERLESSONS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          lessons: lessonId,
          completed_at: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  }

  // obtiene todas las lecciones completadas del usuario
  async function getUsersLessons() {
    if (!user) return [];
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USERLESSONS_COLLECTION_ID,
        [Query.equal("user_id", user.$id)]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }
  }

  return (
    <DoneContext.Provider value={{ completeLesson, getUsersLessons }}>
      {children}
    </DoneContext.Provider>
  );
}
