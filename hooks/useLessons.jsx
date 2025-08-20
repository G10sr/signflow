import { useContext } from "react";
import { LessonsContext } from "../contexts/LessonsContext";
export function useLessons(){
    const context = useContext(LessonsContext)

    if(!context){
        throw new Error("useLessons must be within a LessonsProvider")
    }
    return context
}