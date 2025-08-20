import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { Text } from "react-native";
import CActivityIndicator from "../CActivityInd";

const UserOnly = ({ children }) => {
  const { user, authCheck } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authCheck && user === null) {
      router.replace('/');
    }
  }, [authCheck, user]);

  if (!authCheck) {
    return <CActivityIndicator></CActivityIndicator>;
  }

  if (user === null) {
    return null; // No renderiza nada mientras redirige
  }

  return children;
};

export default UserOnly;
