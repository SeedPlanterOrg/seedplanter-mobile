import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import HomeCard from '../components/HomeCard';
import PlanterPointContainer from '../components/PlanterPointContainer';

{/* Test Data */}
const plantData = [
  {
    id: 1,
    imageSource: require('../assets/marigold.jpg'),
    plantName: "Marigold",
    scientificName: "Scientific Name",
    waterLevelProgress: 0.7,
    nutrientProgress: 0.8
  },
  {
    id: 2,
    imageSource: require('../assets/lettuce.jpg'),
    plantName: "Lettuce",
    scientificName: "Scientific Name",
    waterLevelProgress: 0.9,
    nutrientProgress: 0.2
  },
  {
    id: 3,
    imageSource: require('../assets/strawberry.jpg'),
    plantName: "Strawberry",
    scientificName: "Scientific Name",
    waterLevelProgress: 0.6,
    nutrientProgress: 0.2
  }
];

export default function HomeScreen() {
  {/* This function defines how each item in the flatlist will be rendered */}
  const renderItem = ({ item }) => (
    <HomeCard
      imageSource={item.imageSource}
      plantName={item.plantName}
      scientificName={item.scientificName}
      waterLevelProgress={item.waterLevelProgress}
      nutrientProgress={item.nutrientProgress}
    />
  );

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
              color='#6ABE6B'
              unfilledColor='#D7EED8'
              borderWidth={0}
            />
          </View>

          {/* Planter Points */}
          <View style={styles.planterContainer}>
            <PlanterPointContainer points={123} />
          </View>
        </View>

        {/* My Plants Text */}
        <Text style={styles.myPlants}>
          My <Text style={styles.greenText}>Plants</Text>
        </Text>

         {/* Switched over to a flatlist instead of scrollview to optimize for dynamic data */}
        <FlatList
          data={plantData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingHorizontal: 25,
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
    color: '#6ABE6B'
  },
  // Adjustments for PlanterPointContainer
  planterContainer: {
    marginLeft: 50,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingRight: 4,
    paddingLeft: 4,
  },
});


