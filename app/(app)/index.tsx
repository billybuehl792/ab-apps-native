import { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuthContext } from "@/context/AuthContext";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";

const Index = () => {
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuthContext();

  /** Callbacks */

  const handleSignOut = async () => {
    setLoading(true);
    try {
      auth().signOut();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-2">
      <KeyboardAvoidingView behavior="padding">
        <Text>This is a protected page</Text>
        <Text>Welcome, {currentUser?.displayName ?? currentUser?.email}</Text>

        <Button
          mode="contained"
          disabled={loading}
          onPress={() => handleSignOut()}
        >
          Sign out
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Index;
