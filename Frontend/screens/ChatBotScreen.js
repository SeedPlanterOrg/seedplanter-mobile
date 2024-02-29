import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function ChatBotScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <Text>ChatBot Screen</Text>
        <StatusBar style="auto" />
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