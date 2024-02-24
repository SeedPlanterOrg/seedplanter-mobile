import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../navigation/tabs';

export default function LoginScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Join Now" onPress={() => navigation.navigate(Tabs)}  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});