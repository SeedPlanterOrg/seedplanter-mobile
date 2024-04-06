import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Animated, AppRegistry, FlatList, TextInput, Modal, ImageBackground, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import { MaterialCommunityIcons, FontAwesome6, Feather, AntDesign} from '@expo/vector-icons';
import {getPlantCatalogPage,
  findPlantById, 
  getGarden,
  addPlant,
  createGarden} from '../utils/http';
import filter from "lodash.filter";
import { WebView } from 'react-native-webview';
import { PlantContext } from '../context/PlantContext';
import { useContext } from 'react';


export default function CatalogScreen() {
  const [userInput, setUserInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [modalSciName, setModalSciName] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalCare, setModalCare] = useState('');
  const [modalWater, setModalWater] = useState('');
  const [modalWaterDes, setModalWaterDes] = useState('');
  const [modalSun, setModalSun] = useState('');
  const [modalSunDes, setModalSunDes] = useState('');
  const [modalPrunDes, setModalPrunDes] = useState('');
  const [modalZone, setModalZone] = useState('');
  const [modalImgHardi, setModalImgHardi] = useState('');
  const [modalID, setModalID] = useState('');

  // const [plantsData, setPlantsData] = useState([]);
 // const [fullPlantsData, setFullPlantsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // useEffect(() => {
  //   async function fetchPlants() {
  //     try {
  //       const plantsArray = await getPlantCatalogPage(1);
  //       console.log('DEBUGCODE: ' + plantsArray[1].id);
  //       console.log('DEBUGCODE: ' + plantsArray[1].name);
  //       console.log('DEBUGCODE: ' + plantsArray[1].binomial_name);
  //       console.log('DEBUGCODE: ' + plantsArray[1].zone.hardy);
  //       console.log('DEBUGCODE: ' + plantsArray[1].light[0]);
  //       console.log('DEBUGCODE: ' + plantsArray[1].image_urls[0]);
  //       console.log('DEBUGCODE: ' + plantsArray[1].hardiness_url);

  //       setPlantsData(plantsArray);
  //       setFullPlantsData(plantsArray);
  //     } catch (error) {
  //       console.error('Error fetching plants:', error);
  //       // Optionally, handle errors in the UI (like showing an error message)
  //     }
  //   }

  //   fetchPlants();
  // }, []);

  const { plantsData, setPlantsData, fullPlantsData, setFullPlantsData } = useContext(PlantContext);

  const PlantTile = ({ imageSource, plantName, scientificName, description, care, water, WaterDes, Sun, SunDes, PrunDes, Zone, ImgHardi, ID }) => {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.card}
          onPress={() => {
            setModalVisible(true),
              setModalName(plantName),
              setModalImage(imageSource),
              setModalSciName(scientificName),
              setModalDescription(description),
              setModalCare(care),
              setModalWater(water),
              setModalWaterDes(WaterDes),
              setModalSun(Sun),
              setModalSunDes(SunDes),
              setModalPrunDes(PrunDes),
              setModalZone(Zone),
              setModalImgHardi(ImgHardi),
              setModalID(ID)
          }}
        >
          <View style={styles.cardContent}>
            {imageSource && <Image source={imageSource} style={styles.cardImage} />}
            <View style={styles.textContent}>
              <Text style={styles.plantName} numberOfLines={1} ellipsizeMode='tail'>{plantName}</Text>
              <Text style={styles.scientificName} numberOfLines={1} ellipsizeMode='tail'>{scientificName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const plantSearch = (query) => {
    setSearchQuery(query);
    //const formatQuery = query.toLowerCase();
    const filterData = filter(fullPlantsData, (plant) => {
      return contains(plant, query);
    });
    setPlantsData(filterData);
  }

  const contains = ({name, binomial_name}, query) => {
    if (name.toLowerCase().includes(query.toLowerCase()) || binomial_name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchingbar}
          placeholder="Search"
          clearButtonMode='always'
          value={searchQuery}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(query) => plantSearch(query)}
        />

        <FlatList
          columnWrapperStyle={{ gap: -28  }}
          contentContainerStyle={{ alignItems: 'center', gap: -28 }}
          data={plantsData}
          numColumns={2}
          keyExtractor={item => item.id.toString()} // Ensure item.id is a string
          renderItem={({ item }) => (
            <View>
              <PlantTile
                imageSource={item.image_urls && item.image_urls[0] ? { uri: item.image_urls[0] } : require('../resource/flower1.jpg')}
                plantName={item.name}
                scientificName={item.binomial_name}
                description={item.description}
                care={item.care_level}
                water={item.daily_watering}
                WaterDes={item.watering_description}
                Sun={item.light[0]}
                SunDes={item.sunlight_description}
                PrunDes={item.pruning_description}
                Zone={item.zone.hardy}
                ImgHardi={item.hardiness_url}
                ID={item.id}
              />

              <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
              >
                <View style={styles.ModalView}>
                  <View style={styles.ModalContainer}>
                    <View style={styles.Backbutton}>
                      <Button title="Close" color="#000000" alignItems="left" onPress={() => setModalVisible(false)}></Button>
                    </View>
                    <ScrollView>
                      <View style={styles.centerItems}>
                        <Image source={modalImage} style={styles.modalImageSizing} />
                      </View>
                      <View style={styles.RightText}>
                        <Text style={styles.RightText}>{modalName}</Text>
                      </View>
                      <View style={styles.sciNameText}>
                        <Text style={styles.sciNameText}>{modalSciName}</Text>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.cardGrey}>
                          <Text style={styles.DescriptionText}>Description</Text>
                          <Text style={styles.descriptionOfPlant2}>{modalDescription}</Text>
                        </View>
                      </View>
                      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                        <View style={styles.card3}>
                          <Text style={styles.cardText2}>{modalCare}</Text>
                          <FontAwesome6 name="plant-wilt" size={30} color="#6ABE6B" />
                          <Text style={styles.cardText3}>Care Level</Text>
                        </View>
                        <View style={styles.card7}>
                          <Text style={styles.cardText2}>{modalWater}</Text>
                          <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
                          <Text style={styles.cardText3}>Daily Watering</Text>
                        </View>
                      </View>
                      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                        <View style={styles.card9}>
                          <Text style={styles.cardText2}>{modalSun}</Text>
                          <Feather name="sun" size={30} color="#ffd061" />
                          <Text style={styles.cardText3}>Sun</Text>
                        </View>
                        <View style={styles.card10}>
                          <Text style={styles.cardText2}>{modalZone}</Text>
                          <Feather name="map" size={30} color="#ff7878" />
                          <Text style={styles.cardText3}>Hardy Zone</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.card4}>
                          <Text style={styles.DescriptionText4}>Pruning Description</Text>
                          <Text style={styles.descriptionOfPlant2}>{modalPrunDes}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.cardBlue}>
                          <Text style={styles.DescriptionText2}>Watering Description</Text>
                          <Text style={styles.descriptionOfPlant2}>{modalWaterDes}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.cardYellow}>
                          <Text style={styles.DescriptionText3}>Sunlight Description</Text>
                          <Text style={styles.descriptionOfPlant2}>{modalSunDes}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {/*<View style={styles.cardRed}> */}
                          <Text style={styles.cardText7}>Hardiness Map</Text>
                        {/*</View>*/}
                      </View>
                      <View>
                        <WebView source={{ uri: modalImgHardi }} style={styles.modalImageSizing2}/>
                      </View>

                      {/* add onPress for the adding to catalog */}

                      <View style={{ alignSelf: "flex-end", justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.plusButtonContainer} onPress={() => {
                          let id = '65efc324a82682e507e38ebc' + 1;
                          gardenPlant = {
                            _id: '66003bc6d48a27039a864f5b',
                            id: id,
                            plantId: modalID,
                            water: true,
                            fertilize: true,
                            prune: true,
                            waterLevel: 5,
                            lastWateringDate: "2024-03-21",
                            fertilizerLevel: 3,
                            lastFertilizingDate: "2024-03-15",
                            notes: "This is a test"
                          }
                          try {
                            const response = addPlant(gardenPlant);
                            console.log(response);
                          } catch (err) {
                            console.error(`Failed to add plant: ${err}`);
                          }

                        }}>
                        <AntDesign name="pluscircle" size={40} color="#68b454" />
                      </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
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
    marginBottom: 15,
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
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#fcfafa',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 165,
    height: 200,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 140,
    height: 140,
    borderRadius: 15,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  modalImageSizing: {
    width: 325,
    height: 250,
    padding: 10,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  modalImageSizing2: {
    width: 325,
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
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 2,
    textAlign: 'left',
  },
  scientificName: {
    fontSize: 10,
    color: '#888',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'left',
    marginBottom: 1,
  },
  Backbutton: {
    alignItems: 'left',
    marginBottom: 10,
  },
  addbutton: {
    width: 150,
    borderRadius: 20,
    backgroundColor: '#6ABE6B',
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightImageSize2: {
    width: 40,
    height: 40,
  },
  plantAdd: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 10,
  },
  RightText: {
    justifyContent: 'center',
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
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
    marginLeft: 10,
    color: '#A8A8A8',
    textAlign: 'left',
  },
  DescriptionText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  DescriptionText2: {
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: 10,
    color: '#7EC8E3',
    fontWeight: 'normal',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  DescriptionText3: {
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: 10,
    color: '#ffd061',
    fontWeight: 'normal',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  DescriptionText4: {
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: 10,
    color: '#6ABE6B',
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
    marginLeft: 10,
    marginRight: 10,
    color: '#707070',
    textAlign: 'justify',
    alignItems: 'center',
  },
  descriptionOfPlant2: {
    justifyContent: 'center',
    fontSize: 13,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    color: '#707070',
    textAlign: 'justify',
    alignItems: 'center',
  },
  card3: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: "#6ABE6B",
    borderWidth: 3
  },
  card7: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: "#7EC8E3",
    borderWidth: 3
  },
  card9: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: "#ffd061",
    borderWidth: 3
  },
  card10: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: "#ff7878",
    borderWidth: 3
  },
  cardText2: {
    justifyContent: 'center',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText3: {
    justifyContent: 'center',
    fontSize: 8,
    color: '#707070',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardText7: {
    marginBottom: 5,
    justifyContent: 'center',
    fontSize: 20,
    color: '#ff7878',
    fontWeight: 'normal',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  card4: {
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    justifyContent: 'center',
    shadowRadius: 2,
    width: 325,
    height: 400,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
  },
  cardBlue: {
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    justifyContent: 'center',
    shadowRadius: 2,
    width: 325,
    height: 400,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
  },
  cardYellow: {
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    justifyContent: 'center',
    shadowRadius: 2,
    width: 325,
    height: 400,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
  },
  cardGrey: {
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    justifyContent: 'center',
    shadowRadius: 2,
    width: 325,
    height: 430,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
  },
  cardRed: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: '#f2f7fc',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 5,
    justifyContent: 'center',
    shadowRadius: 2,
    width: 325,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
  },
});