import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Animated, AppRegistry, FlatList, TextInput, Modal, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import  { getPlantCatalogPage, findPlantById} from '../utils/http';

{/* Test Data Replace With data from Database*/ }
const DATA = [
  {
    image_urls: require('../assets/marigold.jpg'),
    name: "Marigold",
    binomial_name: "Tagetes",
    description: "This plant is know for licking balls",
  },
  {
    image_urls: require('../assets/lettuce.jpg'),
    name: "Lettuce",
    binomial_name: "Lactuca sativa",
    description: "This plant is know for being smelly",
  },
  {
    image_urls: require('../assets/strawberry.jpg'),
    name: "Strawberries",
    binomial_name: "Fragaria x ananassa",
    description: "This plant is know for poop",
  },
];

export default function CatalogScreen() {
  const [userInput, setUserInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] =  useState('');
  const [modalImage, setModalImage] =  useState('');
  const [modalSciName, setModalSciName] =  useState('');
  const [modalDescription, setModalDescription] =  useState('');
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


  const PlantTile = ({ imageSource, plantName, scientificName, description }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} 
              onPress={() => {setModalVisible(true), setModalName(plantName), setModalImage(imageSource), setModalSciName(scientificName), setModalDescription(description)}}
            >
                <View style={styles.cardContent}>
                    {imageSource && <Image source={imageSource} style={styles.cardImage} />}
                    <View style={styles.textContent}>
                        <Text style={styles.plantName}>{plantName}</Text>
                        <Text style={styles.scientificName}>{scientificName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
  }

  const filterData = (item) => {
    if (userInput === "") {
      return (
        <View>
          <PlantTile
            imageSource={item.image_urls && item.image_urls[0] ? { uri: item.image_urls[0] } : require('../resource/flower1.jpg')}
            plantName={item.name}
            scientificName={item.binomial_name}
            description={item.description}
          />

        <Modal
          animationType='fade'
          visible={modalVisible} 
          transparent={true}
        >
          <View style={styles.ModalView}>
            <View style={styles.ModalContainer}>

              <TouchableOpacity style={styles.Backbutton} onPress={() => setModalVisible(false)}>
                <Image style={styles.rightImageSize} source={require('../assets/xout.png')}/>
              </TouchableOpacity>

              <ScrollView>
                <View style={styles.centerItems}>
                  <Image source={modalImage} style={styles.modalImageSizing}/>
                </View>

                <View style={styles.RightText}>
                  <Text style={styles.RightText}>{modalName}</Text>
                </View>

                <View style={styles.sciNameText}>
                  <Text style={styles.sciNameText}>{modalSciName}</Text>
                </View>

                <View style={styles.DescriptionText}>
                  <Text style={styles.DescriptionText}>Description</Text>
                </View>


                <View style={styles.descriptionOfPlant}>
                  <Text style={styles.descriptionOfPlant}>{modalDescription}</Text>
                </View>

              </ScrollView>
            </View>
          </View>
        </Modal> 

        </View>
      );
    }

    if (item.name.toLowerCase().includes(userInput.toLowerCase()) || item.name2.toLowerCase().includes(userInput.toLowerCase())) {
      return (
        <View>
          <PlantTile
            imageSource={item.image_urls}
            plantName={item.name}
            scientificName={item.binomial_name}
          />

          {/* Copy Over Modal From Above Here */}


        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchingbar}
          placeholder='Search'
          clearButtonMode='always'
          onChangeText={(text) => setUserInput(text)}
        />

        <FlatList
          columnWrapperStyle={{ gap: -30 }}
          contentContainerStyle={{ alignItems: 'center', gap: -30 }}
          data={plantsData}
          numColumns={2}
          keyExtractor={item => item.id.toString()} // Ensure item.id is a string
          renderItem={({ item }) => (
            filterData(item)
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
  searchingbar: {
    backgroundColor: '#fcfafa',
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    elevation: 3,
    padding: 8,
  },
  ModalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalContainer: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 735,
    width: 375,
    borderRadius: 20,
    elevation: 20,
  },
  centerItems: {
    alignItems: 'center',
  },
  card: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#fcfafa',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 165,
    height: 230,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 125,
    height: 125,
    borderRadius: 15,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  modalImageSizing: {
    width: 300,
    height: 250,
    padding: 10,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContent: {
    flex: 1,
    alignItems: 'center',
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  scientificName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  Backbutton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#C9FFC9',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RightText: {
    justifyContent: 'center',
    fontSize: 30,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#68b454',
    textAlign: 'left',
  },
  rightImageSize: {
    width: 10,
    height: 10,
  },
  sciNameText: {
    justifyContent: 'center',
    fontSize: 15,
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 20,
    color: '#A8A8A8',
    textAlign: 'left',
  },
  DescriptionText: {
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionOfPlant: {
    justifyContent: 'center',
    fontSize: 15,
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#707070',
    textAlign: 'justify',
    alignItems: 'center',
  },
});