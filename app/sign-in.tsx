import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import auth, {
  firebase,
  type FirebaseAuthTypes,
} from "@react-native-firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);

    try {
      const provider = firebase.auth.GoogleAuthProvider;
      await auth().signInWithProvider(provider);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ padding: 12 }}>
          {/* Sign In */}
          <Text
            variant="headlineMedium"
            style={{ fontWeight: 600, marginBottom: 8 }}
          >
            Sign In
          </Text>

          {/* Email */}
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            label="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            disabled={loading || loadingGoogle}
            style={{ marginBottom: 8 }}
          />

          {/* Password */}
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            disabled={loading || loadingGoogle}
            style={{ marginBottom: 16 }}
          />

          {/* Sign In Button */}
          <Button
            mode="contained"
            loading={loading}
            onPress={() => handleSignIn()}
          >
            Sign in
          </Button>

          <Divider bold horizontalInset style={{ marginVertical: 16 }} />

          <Button
            icon="google"
            mode="outlined"
            loading={loadingGoogle}
            onPress={() => handleGoogleSignIn()}
          >
            Sign in with Google
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
