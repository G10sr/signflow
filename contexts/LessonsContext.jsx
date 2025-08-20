import { createContext, useEffect } from "react";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "68674c500017f2f643f6";
const COLLECTION_ID = "688587b2003d9b253ba3";

export const LessonsContext = createContext();
import { useState } from "react";
import { databases } from "../lib/appwrite";
export function LessonsProvider({ children }) {
    const [lessons, setLessons] = useState([]);
    const {user} = useUser();
    async function fetchLessons() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID
            );
            setLessons(response.documents);
            console.log("Lecciones obtenidas:", response.documents);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user) {
            fetchLessons();
        } else {
            setLessons([]); 
        }
    }, [user]);
  return (
    <LessonsContext.Provider value={{ lessons, fetchLessons }}>
      {children}
    </LessonsContext.Provider>
  );
}