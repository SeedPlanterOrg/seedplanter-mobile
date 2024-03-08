
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Animated, AppRegistry, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import PlantTile from '../components/PlantTile';
import  { getPlantCatalogPage, findPlantById} from '../utils/http';

// {/* Test Data Replace With data from Database*/}
// const DATA = [
//   {
//     image: require('../assets/marigold.jpg'),
//     name: "Marigold",
//     name2: "scientific-name"
//   },
//   {
//     image: require('../assets/lettuce.jpg'),
//     name: "Lettuce",
//     name2: "scientific-name"
//   },
//   {
//     image: require('../assets/strawberry.jpg'),
//     name: "Strawberry",
//     name2: "scientific-name"
//   },
// ];

export default function CatalogScreen() {
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
      async function fetchPlants() {
          try {
              const plantsArray = await getPlantCatalogPage(1);
              console.log('DEBUGCODE: ' + plantsArray[1].id);
              console.log('DEBUGCODE: ' + plantsArray[1].name);
              console.log('DEBUGCODE: ' + plantsArray[1].binomial_name);
              console.log('DEBUGCODE: ' + plantsArray[1].image_urls[0]);
              
              setPlantsData(plantsArray);
          } catch (error) {
              console.error('Error fetching plants:', error);
              // Optionally, handle errors in the UI (like showing an error message)
          }
      }

      fetchPlants();
  }, []);

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
          <View style={styles.container}>
              <FlatList
                  contentContainerStyle={{ alignItems: 'center' }}
                  data={plantsData}
                  numColumns={2}
                  keyExtractor={item => item.id.toString()} // Ensure item.id is a string
                  renderItem={({item}) => (
                      <View>
                          <PlantTile

                              //imageSource={{ uri: item.image_urls[0] }}
                              imageSource={item.image_urls && item.image_urls[0] ? { uri: item.image_urls[0] } : require('../resource/flower1.jpg')}
                              plantName={item.name}
                              scientificName={item.binomial_name}
                          />
                      </View>
                  )}
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