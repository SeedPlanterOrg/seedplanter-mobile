import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Animated, AppRegistry, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import PlantTile from '../components/PlantTile';

{/* Test Data Replace With data from Database*/}
const DATA = [
  {
    image: require('../assets/marigold.jpg'),
    name: "Marigold",
    name2: "scientific-name"
  },
  {
    image: require('../assets/lettuce.jpg'),
    name: "Lettuce",
    name2: "scientific-name"
  },
  {
    image: require('../assets/strawberry.jpg'),
    name: "Strawberry",
    name2: "scientific-name"
  },
];

export default function CatalogScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={DATA}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View>
              <PlantTile
                imageSource={item.image}
                plantName={item.name}
                scientificName={item.name2}
              />
              </View>
            );
          }}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
});