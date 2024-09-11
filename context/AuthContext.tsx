import { View } from "react-native";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";
import { Text } from "react-native-paper";

interface IAuthContextState {
  currentUser: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

const AuthContext = createContext<IAuthContextState>({
  currentUser: null,
  initializing: true,
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] =
    useState<IAuthContextState["currentUser"]>(null);

  const router = useRouter();
  const segments = useSegments();

  /** Callbacks */

  const handleAuthStateChanged = async (
    user: IAuthContextState["currentUser"]
  ) => {
    setCurrentUser(user);
    setInitializing(false);
  };

  /** Effects */

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber;
  }, []);

  // Route guard
  useEffect(() => {
    if (initializing) return;

    const inApp = segments[0] === "(app)";

    if (!currentUser && inApp)
      router.replace("/sign-in"); // not signed in > sign in
    else if (currentUser && !inApp) router.replace("/(app)"); // signed in > app
  }, [currentUser, initializing]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        initializing,
      }}
    >
      {initializing ? (
        <View>
          <Text>Loading!</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
