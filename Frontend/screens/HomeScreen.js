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
import {
  getPlantCatalogPage,
  findPlantById, 
  getGarden,
  addPlant,
  createGarden
} from '../utils/http'

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [wateringNotify, setWateringNotify] = useState(false); // State for watering toggle
  const [nutrientsNotify, setNutrientsNotify] = useState(false); // State for nutrients toggle
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


  const renderItem = ({ item }) => (
    <HomeCard
      imageSource={{ uri: item.imageSource }} 
      plantName={item.plantName}
      scientificName={item.scientificName}
      waterLevelProgress={item.waterLevelProgress}
      nutrientProgress={item.nutrientProgress}
    />
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddPlant = () => {
    // Add new plant data to the state
    const newPlantData = [...plantData, {
      id: plantData.length + 1,
      imageSource: require('../assets/lettuce.jpg'), 
      plantName: 'New Plant',
      scientificName: 'Scientific Name', 
      waterLevelProgress: 0.5, 
      nutrientProgress: 0.5, 
    }];
    setPlantData(newPlantData);
    closeModal();
  };

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
              progress={0.6}
              width={200}
              height={39}
              borderRadius={20}
              color="#6ABE6B"
              unfilledColor="#D7EED8"
              borderWidth={0}
            />
          </View>

          {/* Planter Points */}
          <View style={styles.planterContainer}>
            <PlanterPointContainer points={123} />
          </View>

          {/* Plus Button */}
          <TouchableOpacity style={styles.plusButtonContainer} onPress={openModal}>
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

        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal Miniscreen */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalView}>
            <View style={styles.ModalContainer}>
              <TouchableOpacity style={styles.Backbutton} onPress={closeModal}>
                <Image style={styles.rightImageSize} source={require('../assets/xout.png')} />
              </TouchableOpacity>
              
              {/* Placeholder before I add the add image button functionality */}
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/lightgray.svg')}
                  style={styles.modalImage}
                />
                {/* Plus Button */}
                <TouchableOpacity style={styles.plusIconContainer}>
                  <Image
                    source={require('../assets/plus_icon.png')}
                    style={styles.plusButton}
                  />
                </TouchableOpacity>
              </View>

              {/* AddPlantCard Component for Watering */}
              <AddPlantCard
                notifyMe={wateringNotify}
                toggleNotifyMe={toggleWateringNotify}
                headerText="Watering"
                imageSource={require('../assets/rain.png')}
              />

              {/* AddPlantCard Component for Nutrients */}
              <AddPlantCard
                notifyMe={nutrientsNotify}
                toggleNotifyMe={toggleNutrientsNotify}
                headerText="Nutrients"
                imageSource={require('../assets/leaf.png')}
              />

              <Button title="Add Plant" onPress={handleAddPlant} />

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
    backgroundColor: '#C9FFC9',
    borderRadius: 20,
  },
  plusButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalView: {
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
  Backbutton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#C9FFC9',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 3, 
    borderColor: '#6ABE6B', 
    backgroundColor: 'transparent', 
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: 80,
    backgroundColor: '#C9FFC9',
    borderRadius: 20,
  },
});
