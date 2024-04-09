import React, { useState, useEffect, memo } from 'react';
import {View, SafeAreaView, FlatList, TextInput} from 'react-native';
import {getPlantCatalogPage,
} from '../utils/http';
import filter from "lodash.filter";
import PlantTile from '../components/PlantTile';
import { styles } from '../styles/CatalogStyles';
import PlantModal from '../components/PlantModal';



export default function CatalogScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullPlantsData, setFullPlantsData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);


  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    async function fetchPlants() {
      try {
        const plantsArray = await getPlantCatalogPage(1);
        console.log('DEBUGCODE: ' + plantsArray[1].id);
        console.log('DEBUGCODE: ' + plantsArray[1].name);
        console.log('DEBUGCODE: ' + plantsArray[1].binomial_name);
        console.log('DEBUGCODE: ' + plantsArray[1].zone.hardy);
        console.log('DEBUGCODE: ' + plantsArray[1].light[0]);
        console.log('DEBUGCODE: ' + plantsArray[1].image_urls[0]);
        console.log('DEBUGCODE: ' + plantsArray[1].hardiness_url);
        setPlantsData(plantsArray);
        setFullPlantsData(plantsArray);
      } catch (error) {
        console.error('Error fetching plants:', error);
        // Optionally, handle errors in the UI (like showing an error message)
      }
    }

    fetchPlants();
  }, []);


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

  const handleSelectPlant = (plant) => {
    console.log('Plant selected:', plant);
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  // const openModal = () => {
  //   setModalVisible(true);
  // }

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
                plant={item}
                onSelect={() => handleSelectPlant(item)}
              />
              

            </View>
          )}
        />
        {modalVisible && <PlantModal plant={selectedPlant} onClose={handleCloseModal} modalVisible={modalVisible}/>}
      </View>
    </SafeAreaView>
  );
}