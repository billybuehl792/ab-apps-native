import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

const NotFoundScreen: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text variant="headlineLarge">This screen doesn't exist.</Text>
        <Link href="/">
          <Text variant="bodyMedium">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
