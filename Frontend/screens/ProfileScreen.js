import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

  const navigation = useNavigation();

  const handleLogout = async () => {
    // Clear the user's credentials
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('token');

    console.log("Logged out!", AsyncStorage.getAllKeys());

    // Navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        {/* {errorMessage && <Text style={styles.error}>{errorMessage}</Text>} */}
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});