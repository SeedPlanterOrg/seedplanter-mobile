import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback, 
  Modal,
  TextInput,
  Button,
  useColorScheme
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import HomeCard from '../components/HomeCard';
import PlanterPointContainer from '../components/PlanterPointContainer';
import AddPlantCard from '../components/AddPlantCard';
import * as ImagePicker from 'expo-image-picker';
import { getGarden } from '../utils/http'
import { useTheme, ThemeProvider } from 'styled-components/native';
import { Image } from 'expo-image';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {deleteGardenPlant} from '../utils/http';



export default function HomeScreen() {
  const [customPlantModalVisible, setCustomPlantModalVisible] = useState(false);
  const [addOptionsModalVisible, setAddOptionsModalVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(0.57);
  const [wateringNotify, setWateringNotify] = useState(false); 
  const [nutrientsNotify, setNutrientsNotify] = useState(false); 
  const [image, setImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const [plantName, setPlantName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const navigation = useNavigation();
  // const [plantData, setPlantData] = useState([
  //   {
  //     id: 1,
  //     imageSource: require('../assets/marigold.jpg'),
  //     plantName: 'Marigold',
  //     scientificName: 'Scientific Name',
  //     waterLevelProgress: 0.7,
  //     nutrientProgress: 0.8,
  //   },
  //   {
  //     id: 2,
  //     imageSource: require('../assets/lettuce.jpg'),
  //     plantName: 'Lettuce',
  //     scientificName: 'Scientific Name',
  //     waterLevelProgress: 0.9,
  //     nutrientProgress: 0.2,
  //   },
  //   {
  //     id: 3,
  //     imageSource: require('../assets/strawberry.jpg'),
  //     plantName: 'Strawberry',
  //     scientificName: 'Scientific Name',
  //     waterLevelProgress: 0.6,
  //     nutrientProgress: 0.2,
  //   },
  //   //This can be replaced with API later
  // ]);
  


  // let user = '65efc324a82682e507e38ebc';
  const [plantData, setPlantData] = useState([]);
  const isFocused = useIsFocused();

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', async () => {
    async function fetchPlants() {
      try {
        const user = await AsyncStorage.getItem('userId');
        const data = await getGarden(user);
        let displayData = [];
        let image;
        data.gardenPlants.forEach(plant => {
          if(Array.isArray(plant.plantDetails)){
            plant.plantDetails.forEach(detail => {
              // Access other properties as needed
            });
          }
          if (plant.plantDetails && plant.plantDetails.image_urls != null) {
            image = plant.plantDetails.image_urls[0];
          }
          // let waterRatio = plant.waterLevel;
          // let nutrientRatio = plant.fertilizerLevel;
          setProgressValue(data.garden.gardenHealthLevel);
          let min = 100;
          let max = 1000;
          // let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
          newPlant = {
            id: plant._id, 
            imageSource: image,
            plantName: plant.plantDetails.name,
            scientificName: plant.plantDetails.binomial_name,
            waterLevelProgress: plant.waterLevel,
            nutrientProgress: plant.fertilizerLevel,
          }
          displayData.push(newPlant);
        });
        setPlantData(displayData);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    }
    fetchPlants();
    //  Then call fetchPlants every 5 seconds
    const intervalId = setInterval(fetchPlants, 10000);

    // // Clear interval on component unmount
    return () => clearInterval(intervalId);
  });

  return unsubscribe;
}, [navigation]);

  // Functions to update plant names and scientific names
  const handlePlantNameChange = (text) => {
    setPlantName(text);
  };
  const handleScientificNameChange = (text) => {
    setScientificName(text);
  };

  // Function to handle both the custom and catalog option from the AddOptionsModal
  const handleAddOptionSelection = (option) => {
    if (option === 'Catalog') {
      // Placeholder function for adding from catalog
      console.log('Add from Catalog selected');
      navigation.navigate('Search Plants');
    } else if (option === 'Custom') {
      openCustomPlantModal();
    }
    // Close the add options after option is selected
    setAddOptionsModalVisible(false);
  };

  // Functions to open and close the AddOptionsModal
  const openAddOptionsModal = () => {
    setAddOptionsModalVisible(true);
  };
  const closeAddOptionsModal = () => {
    setAddOptionsModalVisible(false);
  };

  // This functions handles image selection 
  const handleImagePickerPress = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      aspect: [1,1], 
      quality: 1, 
    })
    if(!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // This function defines how the homecard will be rendered
  const renderItem = ({ item }) => (
    <HomeCard
      imageSource={{ uri: item.imageSource } } 
      plantName={item.plantName}
      scientificName={item.scientificName}
      waterLevelProgress={item.waterLevelProgress}
      nutrientProgress={item.nutrientProgress}
      onDelete={() => deletePlant(item)} 
    />
  );
  
  // Functions to open and close the add CustomPlantModal
  const openCustomPlantModal = () => {
    setCustomPlantModalVisible(true);
  };
  const closeCustomPlantModal = () => {
    setCustomPlantModalVisible(false);
  };

  // Adds custom plant card to homescreen
  const handleAddPlant = () => {
    setImage(''); // Reset the displayed image in the CustomPlantModel
    const newPlantData = [...plantData, {
      id: plantData.length + 1,
      imageSource: image ? image : require('../assets/lettuce.jpg'),
      plantName: plantName ? plantName : 'New Plant', // Use updated plant name
      scientificName: scientificName ? scientificName : 'Scientific Name', // Use updated scientific name
      waterLevelProgress: 0.5, 
      nutrientProgress: 0.5, 
    }];
    setPlantData(newPlantData);
    closeCustomPlantModal();
    setPlantName('');
    setScientificName('');
  };

  // Function to delete a plant card 
  const deletePlant = async (plantObj) => {
    let id = plantObj.id;
    try {
      const user = await AsyncStorage.getItem('userId');
      console.log("id " + user);
      deleteGardenPlant(user, plantObj._id)
    } catch (error) {
      console.log(`Error deleteing plant: ${err}`);
    }
    
    console.log("PLANT_ID= " + plantObj);
    console.dir("User_ID= " + plantObj);
    console.log("Deleting plant with ID:", id); // Log a message
    const updatedPlantData = plantData.filter(item => item.id !== id);
    setPlantData(updatedPlantData);
  };

  // Toggle Functions
  const toggleWateringNotify = () => {
    setWateringNotify((prevState) => !prevState);
  };
  const toggleNutrientsNotify = () => {
    setNutrientsNotify((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#FFF' }, {backgroundColor: theme.gardenBackground}]}>
      <View style={styles.container}>
        {/* Wrapped the two objects, ProgressBar and PlanterPointContainer, into a header container */}
        <View style={styles.headerContainer}>
          <View style={styles.gardenHealthMeter}>
            <Text style={styles.healthMeterText}>Garden Health</Text>
              <Progress.Bar
                progress={progressValue}
                width={200}
                height={39}
                borderRadius={20}
                color="#1DB954"
                unfilledColor={theme.progUnfill}
                borderWidth={0}
              />
            <Text style={styles.progressValueText}>{`${Math.round(progressValue * 100)}%`}</Text>
          </View>

          {/* Planter Points */}
          <View style={styles.planterContainer}>
            <PlanterPointContainer points={123} />
          </View>

          {/* Plus Button */}
          <TouchableOpacity style={styles.plusButtonContainer} onPress={openAddOptionsModal}>
            <Image
              source={require('../assets/plus_icon.png')}
              style={[styles.plusButton, {tintColor: theme.gardenBackground}]}
            />
          </TouchableOpacity>
        </View>

        {/* My Plants Text */}
        <Text style={[styles.myPlants, {color: theme.text}]}>
          My <Text style={styles.greenText}>Plants</Text>
        </Text>

        {/* Cards */}
        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 80 }} />} 
        />

        {/* AddOptionsModal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={addOptionsModalVisible}
          onRequestClose={() => setAddOptionsModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setAddOptionsModalVisible(false)}>
            <View style={styles.ModalView}>
              <View style={[styles.selectModalContainer, { backgroundColor: theme.gardenBackground }]}>
                <View style={styles.selectModalButton}>
                  <TouchableOpacity onPress={() => handleAddOptionSelection('Custom')}>
                    <Text style={styles.addButtonText}>Add Custom Plant</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.selectModalButton}>
                  <TouchableOpacity onPress={() => handleAddOptionSelection('Catalog')}>
                    <Text style={styles.addButtonText}>Add from Catalog</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* CustomPlantModal */}
        <Modal
          animationType="slide"
          presentationStyle='pageSheet'
          visible={customPlantModalVisible}
          onRequestClose={closeCustomPlantModal}>
          <View style={[styles.customPlantModalContainer, { backgroundColor: theme.gardenBackground }]}>
            {/* Backbutton */}
            <View style={styles.Backbutton}>
              <Button title="Close" color={theme.text} alignItems="left" onPress={closeCustomPlantModal}></Button>
            </View>

            {/* Image Selector */}
            <View style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.modalImage} /> // Image selected, set to user image
              ) : (
                <Image 
                  source={require('../assets/lightgray.svg')} // Else set the image to the default
                  style={styles.modalImage} 
                />
              )}

              {/* Plus Button */}
              <TouchableOpacity style={styles.plusIconContainer} onPress={handleImagePickerPress}>
                <Image
                  source={require('../assets/plus_icon.png')}
                  style={[styles.plusButton, {tintColor: theme.gardenBackground}]}
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {color: theme.text}]}>Plant Name</Text>
              <TextInput
                style={[styles.input, {color: theme.text}]}
                onChangeText={handlePlantNameChange}
                value={plantName}
                placeholder="Enter plant name"
                placeholderTextColor="#888" 
              />
            </View>
            <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, {color: theme.text}]}>Scientific Name</Text>
              <TextInput
                style={[styles.input, {color: theme.text}]}
                onChangeText={handleScientificNameChange}
                value={scientificName}
                placeholder="Enter scientific name"
                placeholderTextColor="#888" 
              />
            </View>


            {/* FlatList for both AddPlantCard components */}
            <FlatList
              data={[
                {
                  id: 1,
                  headerText: 'Watering',
                  imageSource: require('../assets/rain.png'),
                  lastDateText: 'watering',
                  notifyMe: wateringNotify,
                  toggleNotifyMe: toggleWateringNotify,
                },
                {
                  id: 2,
                  headerText: 'Nutrients',
                  imageSource: require('../assets/leaf.png'),
                  lastDateText: 'feeding',
                  notifyMe: nutrientsNotify,
                  toggleNotifyMe: toggleNutrientsNotify,
                },
                {
                  id: 'addButton',
                  isButton: true,
                }
              ]}
              renderItem={({ item }) => (
                <View style={styles.addPlantCardContainer}>
                  {item.isButton ? (
                    // Add plant button 
                    <View style={styles.addButtonContainer}>
                      <View style={styles.addButtonBackground}>
                        <TouchableOpacity onPress={handleAddPlant}>
                          <Text style={styles.addButtonText}>Add Plant</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    // Add plant card
                    <AddPlantCard
                      headerText={item.headerText}
                      imageSource={item.imageSource}
                      lastDateText={item.lastDateText}
                      notifyMe={item.notifyMe}
                      toggleNotifyMe={item.toggleNotifyMe}
                    />
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  gardenHealthMeter: {
    alignItems: 'flex-start',
  },
  healthMeterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 10,
  },
  progressValueText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -80 }, { translateY: 7 }], 
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },  
  myPlants: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    paddingLeft: 15,
  },
  greenText: {
    color: '#1DB954',
  },
  planterContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  scrollView: {
    width: '100%',
  },
  plusButtonContainer: {
    marginLeft: 15,
    marginTop: 30,
    backgroundColor: '#1DB954',
    borderRadius: 20,
  },
  plusButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  ModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  customPlantModalContainer: {
    flex: 1, 
    backgroundColor: '#fff', 
  },  
  Backbutton: {
    alignItems: 'left',
    marginTop: 10,
    marginLeft: 10,
  },
  rightImageSize: {
    width: 10,
    height: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalImage: {
    width: 150, 
    height: 150, 
    borderRadius: 20,
    borderWidth: 1.5, 
    borderColor: '#1DB954', 
    backgroundColor: 'transparent', 
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: 105,
    backgroundColor: '#1DB954',
    borderRadius: 20,
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'flex-end', 
    justifyContent: 'flex-end', 
    padding: 15,
  },
  addButtonBackground: {
    marginTop: 20,
    backgroundColor: '#1DB954', 
    borderRadius: 20,
    width: 150, 
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 10,
  },  
  selectModalContainer: {
    backgroundColor: '#fff',
    height: 270,
    width: 270,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectModalButton: {
    marginTop: 15, 
    marginBottom: 15, 
    backgroundColor: '#1DB954',
    borderRadius: 20,
    width: 200,
  },
  selectModalBackButton: {
    position: 'absolute', 
    top: 20, 
    left: 20, 
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#C9FFC9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlantCardContainer: {
    marginHorizontal:0, 
  },
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#1DB954',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
});
