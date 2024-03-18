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

// Test Data
const plantData = [
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
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addType, setAddType] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [notifyMe, setNotifyMe] = useState(false);

  const renderItem = ({ item }) => (
    <HomeCard
      imageSource={item.imageSource}
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
    // adding logic later
    closeModal();
  };

  const toggleNotifyMe = () => {
    setNotifyMe((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        {/* Wrapped the two objects, ProgressBar and PlanterPointContainer, into a header container */}
        <View style={styles.headerContainer}>
          <View style={styles.gardenHealthMeter}>
            <Text style={styles.healthMeterText}>Garden Health</Text>
            <Progress.Bar
              progress={0.6}
              width={200}
              height={39}
              borderRadius={10}
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

              {/* AddPlantCard Component */}
              <AddPlantCard
                notifyMe={notifyMe}
                toggleNotifyMe={toggleNotifyMe}
                headerText="Watering"
                imageSource={require('../assets/rain.png')}
              />

              <AddPlantCard
                notifyMe={notifyMe}
                toggleNotifyMe={toggleNotifyMe}
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
});
