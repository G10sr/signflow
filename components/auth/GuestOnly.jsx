import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { Text } from "react-native";
import CActivityIndicator from "../CActivityInd";

const GuestOnly = ({ children }) => {
  const { user, authCheck } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authCheck && user !== null) {
    console.log("Redirigiendo a /home");

      router.replace('/home');
    }
  }, [authCheck, user]);

  if (!authCheck) {
    return <CActivityIndicator></CActivityIndicator>;
  }

  if (user === null) {
    return children;
  }

  return null; // Redirige, no renderiza nada
};

export default GuestOnly;
