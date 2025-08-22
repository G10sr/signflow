import { useContext } from "react";
import { DoneContext } from "../contexts/DoneContext";

export function useDone() {
  const context = useContext(DoneContext);
  if (!context) throw new Error("useDone must be used within a DoneProvider");
  return context;
}
