import { createContext, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { Query } from "appwrite"; // 👈 Importa Query

const DATABASE_ID = "68674c500017f2f643f6";
const COLLECTION_ID = "688587b2003d9b253ba3";
const WORDSCOLLECTION_ID = "688589640018bc26c63a"

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
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchLessonByID(id) {
        try{
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );

            return response
        } catch (error){
            console.log(error);
        }
    }
    async function fetchWordsByLessonID(lessonId) { 
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            WORDSCOLLECTION_ID,
            [Query.equal('lessons', lessonId)] // 👈 Busca palabras donde el atributo 'lessons' sea igual al 'lessonId'
        );
        return response.documents; 
    } catch (error) {
        console.log("Error fetching words:", error);
        return [];
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
    <LessonsContext.Provider value={{ lessons, fetchLessons, fetchLessonByID, fetchWordsByLessonID }}>
      {children}
    </LessonsContext.Provider>
  );
}