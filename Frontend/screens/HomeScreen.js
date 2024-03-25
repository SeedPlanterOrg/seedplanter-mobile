import React, { useState } from 'react';
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

export default function HomeScreen() {
  // States
  const [customPlantModalVisible, setCustomPlantModalVisible] = useState(false);
  const [addOptionsModalVisible, setAddOptionsModalVisible] = useState(false);
  const [wateringNotify, setWateringNotify] = useState(false); 
  const [nutrientsNotify, setNutrientsNotify] = useState(false); 
  const [image, setImage] = useState('');
  const [plantData, setPlantData] = useState([
    {
      id: 1,
      imageSource: require('../assets/marigold.jpg'),
      plantName: 'Marigold',
      scientificName: 'Scientific Name',
      waterLevelProgress: 0.7,
      nutrientProgress: 0.8,
    },
    {
      id: 2,
      imageSource: require('../assets/lettuce.jpg'),
      plantName: 'Lettuce',
      scientificName: 'Scientific Name',
      waterLevelProgress: 0.9,
      nutrientProgress: 0.2,
    },
    {
      id: 3,
      imageSource: require('../assets/strawberry.jpg'),
      plantName: 'Strawberry',
      scientificName: 'Scientific Name',
      waterLevelProgress: 0.6,
      nutrientProgress: 0.2,
    },
    // This can be replaced with API later
  ]);

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
      imageSource={item.imageSource}
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

              <TouchableOpacity style={styles.selectModalBackButton} onPress={closeAddOptionsModal}>
                <Image style={styles.rightImageSize} source={require('../assets/xout.png')} />
              </TouchableOpacity>

            </View>
          </View>
        </Modal>


        {/* CustomPlantModal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={customPlantModalVisible}
          onRequestClose={closeCustomPlantModal}>
          <View style={styles.ModalView}>
            <View style={styles.customPlantModalContainer}>
              <TouchableOpacity style={styles.Backbutton} onPress={closeCustomPlantModal}>
                <Image style={styles.rightImageSize} source={require('../assets/xout.png')} />
              </TouchableOpacity>

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

              {/* Add Plant Button */}
              <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={handleAddPlant}>
                  <Text style={styles.addButtonText}>Add Plant</Text>
                </TouchableOpacity>
              </View>

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
  ModalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customPlantModalContainer: {
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
  addButtonContainer: {
    marginTop: 50,
    backgroundColor: '#6ABE6B', 
    borderRadius: 20,
    width: 150, 
    marginLeft: 190, 
  },
  addButtonText: {
    fontSize: 18,
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
    height: 250,
    width: 375,
    borderRadius: 20,
    elevation: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  selectModalButton: {
    marginTop: 15, 
    marginBottom: 15, 
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
});
