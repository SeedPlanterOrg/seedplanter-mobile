import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import * as Progress from 'react-native-progress';
import HomeCard from '../components/HomeCard';
import PlanterPointContainer from '../components/PlanterPointContainer';
import AddPlantCard from '../components/AddPlantCard';
import * as ImagePicker from 'expo-image-picker';
import {
  getPlantCatalogPage,
  findPlantById, 
  getGarden,
  addPlant,
  createGarden
} from '../utils/http'

export default function HomeScreen() {
  const [customPlantModalVisible, setCustomPlantModalVisible] = useState(false);
  const [addOptionsModalVisible, setAddOptionsModalVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(0.57);
  const [wateringNotify, setWateringNotify] = useState(false); 
  const [nutrientsNotify, setNutrientsNotify] = useState(false); 
  const [image, setImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
  
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
        try {
            const data = await getGarden('65efc324a82682e507e38ebc');
            // console.log('DEBUGCODE_HOME_SCREEN: ' + data);
            let displayData = [];
            // console.log('DEBUGCODE_HOME_SCREEN: ---------------------------------------------------------------------');
            // console.log('DEBUGCODE_HOME_SCREEN: ' + JSON.stringify(data.gardenPlants));
            // console.log('DEBUGCODE_HOME_SCREEN: ---------------------------------------------------------------------');
            let plants = data.gardenPlants;
            let image;
            data.gardenPlants.forEach(plant => {
              console.log("Plant ID:", plant._id);
              console.log("Garden ID:", plant.gardenId);
              //console.log("Plant Details:", plant.plantDetails);
          
              // If plantDetails is an array, iterate over it as well
              if(Array.isArray(plant.plantDetails)){
                  plant.plantDetails.forEach(detail => {
                      console.log("Detail ID:", detail._id);
                      console.log("Detail Name:", detail.name);
                      console.log("Detail Name:", detail.binomial_name);
                      console.log("Detail Name:", detail.image_urls[0]);
                      // Access other properties as needed
                  });
              }
              if (plant.plantDetails && plant.plantDetails.image_urls != null) {
                image = plant.plantDetails.image_urls[0];
            }
            let waterRatio = plant.waterLevel / 10;
            let nutrients = plant.fertilizerLevel / 10;
            newPlant = {
                id: plant.plantId.toString(), // CHANGE WHEN DATABASE IS FIXED
                // id: `default-${Math.random()}`,
                imageSource: image,
                plantName: plant.plantDetails.name,
                scientificName: plant.plantDetails.binomial_name,
                waterLevelProgress: waterRatio,
                nutrientProgress: nutrients,
                  //     id: 3,
  //     imageSource: require('../assets/strawberry.jpg'),
  //     plantName: 'Strawberry',
  //     scientificName: 'Scientific Name',
  //     waterLevelProgress: 0.6,
  //     nutrientProgress: 0.2,
            }
            displayData.push(newPlant);
              console.log(displayData);
          });
            
              
            // console.log(displayData);
            setPlantData(displayData);
        } catch (error) {
            console.error('Error fetching plants:', error);
            // Optionally, handle errors in the UI (like showing an error message)
        }
    }

    fetchPlants();
  }, []);


  // Function to handle both the custom and catalog option from the AddOptionsModal
  const handleAddOptionSelection = (option) => {
    if (option === 'Catalog') {
      // Placeholder function for adding from catalog
      console.log('Add from Catalog selected');
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
      imageSource={{ uri: item.imageSource }} 
      plantName={item.plantName}
      scientificName={item.scientificName}
      waterLevelProgress={item.waterLevelProgress}
      nutrientProgress={item.nutrientProgress}
      onDelete={() => deletePlant(item.id)} 
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
      imageSource: image ? { uri: image } : require('../assets/lettuce.jpg'), // Set to the user-selected image if available, otherwise use 'lettuce.jpg'
      plantName: 'New Plant',
      scientificName: 'Scientific Name', 
      waterLevelProgress: 0.5, 
      nutrientProgress: 0.5, 
    }];
    setPlantData(newPlantData);
    closeCustomPlantModal();
  };

  // Function to delete a plant card 
  const deletePlant = (id) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
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
              color="#6ABE6B"
              unfilledColor="#D7EED8"
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
              style={styles.plusButton}
            />
          </TouchableOpacity>
        </View>

        {/* My Plants Text */}
        <Text style={styles.myPlants}>
          My <Text style={styles.greenText}>Plants</Text>
        </Text>

        {/* Cards */}
        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        />

        {/* AddOptionsModal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={addOptionsModalVisible}
          onRequestClose={() => setAddOptionsModalVisible(false)}>
          <View style={styles.ModalView}>
            <View style={styles.selectModalContainer}>

              {/* Backbutton */}
              <View style={styles.Backbutton}>
                <Button title="Close" color="#000000" alignItems="left" onPress={closeAddOptionsModal}></Button>
              </View>

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
        </Modal>


        {/* CustomPlantModal */}
        <Modal
          animationType="slide"
          presentationStyle='pageSheet'
          visible={customPlantModalVisible}
          onRequestClose={closeCustomPlantModal}>
          <View style={styles.customPlantModalContainer}>
            {/* Backbutton */}
            <View style={styles.Backbutton}>
              <Button title="Close" color="#000000" alignItems="left" onPress={closeCustomPlantModal}></Button>
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
                  style={styles.plusButton}
                />
              </TouchableOpacity>
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
              ]}
              renderItem={({ item }) => (
                <View style={styles.addPlantCardContainer}>
                  <AddPlantCard
                    headerText={item.headerText}
                    imageSource={item.imageSource}
                    lastDateText={item.lastDateText}
                    notifyMe={item.notifyMe}
                    toggleNotifyMe={item.toggleNotifyMe}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />

            {/* Add Plant Button */}
            <View style={styles.addButtonContainer}>
              <TouchableOpacity onPress={handleAddPlant}>
                <Text style={styles.addButtonText}>Add Plant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gardenHealthMeter: {
    alignItems: 'flex-start',
  },
  healthMeterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6ABE6B',
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
  },
  greenText: {
    color: '#6ABE6B',
  },
  planterContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingRight: 4,
    paddingLeft: 4,
  },
  plusButtonContainer: {
    marginLeft: 5,
    marginTop: 30,
    backgroundColor: '#6ABE6B',
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
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 760,
    borderRadius: 20,
    elevation: 20,
  }, 
  Backbutton: {
    alignItems: 'left',
    marginBottom: 10,
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
    borderColor: '#6ABE6B', 
    backgroundColor: 'transparent', 
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: 80,
    backgroundColor: '#6ABE6B',
    borderRadius: 20,
  },
  addButtonContainer: {
    marginTop: 20,
    backgroundColor: '#6ABE6B', 
    borderRadius: 20,
    width: 150, 
    marginLeft: 190, 
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 270,
    width: 270,
    borderRadius: 20,
    elevation: 20,
  },
  selectModalButton: {
    marginTop: 15, 
    marginBottom: 15, 
    marginLeft: 15, 
    marginRight: 15, 
    backgroundColor: '#6ABE6B',
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
    marginHorizontal:6, 
  },
});
