import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import HomeCard from '../components/HomeCard';
import PlanterPointContainer from '../components/PlanterPointContainer';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        {/* Wrapped the two objects, ProgressBar and PlanterPointContainer, into a header container */}
        <View style={styles.headerContainer}>
          <View style={styles.gardenHealthMeter}>
            <Text style={styles.healthMeterText}>Garden Health</Text>
            {/* Progress Bar */}
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

        <Text style={styles.myPlants}>
          My <Text style={styles.greenText}>Plants</Text>
        </Text>

        {/* Cards are contained here in this scroll view */}
        {/* You can modify the info as you like, eventually this should just read from the API information */}
        <ScrollView style={styles.scrollView}>
          {/* Card 1*/}
          <HomeCard
            imageSource={require('../assets/marigold.jpg')}
            plantName="Marigold"
            scientificName="Scientific Name"
            waterLevelProgress={0.7}
            nutrientProgress={0.8}
          />

          {/* Card 2*/}
          <HomeCard
            imageSource={require('../assets/lettuce.jpg')}
            plantName="Lettuce"
            scientificName="Scientific Name"
            waterLevelProgress={0.9}
            nutrientProgress={0.2}
          />

          {/* Card 3*/}
          <HomeCard
            imageSource={require('../assets/strawberry.jpg')}
            plantName="Strawberry"
            scientificName="Scientific Name"
            waterLevelProgress={0.6}
            nutrientProgress={0.2}
          />
        </ScrollView>
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
    color: '#6ABE6B', // Pastel green color
    marginBottom: 10,
  },
  myPlants: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  // Card Styling
  scrollView: {
    flex: 1,
    width: '100%',
  },
  // Green Text
  greenText: {
    color: '#6ABE6B'
  },
  // Adjustments for PlanterPointContainer
  planterContainer: {
    marginLeft: 50,
  },
});





