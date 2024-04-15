import React, { useState, useEffect, memo } from 'react';
import {View, SafeAreaView, FlatList, TextInput, useColorScheme} from 'react-native';
import {getPlantCatalogPage,
} from '../utils/http';
import filter from "lodash.filter";
import PlantTile from '../components/PlantTile';
import { styles } from '../styles/CatalogStyles';
import PlantModal from '../components/PlantModal';
const PAGE_LIMIT = 11;
import { useTheme, ThemeProvider } from 'styled-components/native';


export default function CatalogScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullPlantsData, setFullPlantsData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();


  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    async function fetchPlants(page) {
      try {
        const plantsArray = await getPlantCatalogPage(page);
        setPlantsData(prevPlants => [...prevPlants, ...plantsArray]);
        setFullPlantsData(prevPlants => [...prevPlants, ...plantsArray]);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    }

    fetchPlants(currentPage);
  }, [currentPage]);


  const plantSearch = (query) => {
    setSearchQuery(query);
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

  return (
    <ThemeProvider theme={theme}>
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.gardenBackground }}>
      <View style={styles.container}>
        <TextInput 
          style={[styles.searchingbar, {color: theme.text}]}
          placeholderTextColor="#888" 
          placeholder="Search"
          clearButtonMode='always'
          value={searchQuery}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(query) => plantSearch(query)}
        />

        <FlatList
          columnWrapperStyle={{ gap: -20  }}
          contentContainerStyle={{ alignItems: 'center', gap: -20}}
          data={plantsData}
          numColumns={2}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Ensure item.id is a string
          onEndReached={() => {
            if (currentPage < PAGE_LIMIT) {
              setCurrentPage(prevPage => prevPage + 1);
            }
          }}
          onEndReachedThreshold={0.6}
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
    </ThemeProvider>
  );
}