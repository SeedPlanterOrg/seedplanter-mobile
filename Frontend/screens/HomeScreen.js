import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Progress from 'react-native-progress';

// Card Component 
// Added a couple new components here for ease of use and readability
// Cards now have dynamically adjustable information 
const Card = ({ children, imageSource, plantName, scientificName, waterLevelProgress, nutrientProgress }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        {imageSource && <Image source={imageSource} style={styles.cardImage} />}
        <View style={styles.textContent}>
          <Text style={styles.plantName}>{plantName}</Text>
          <Text style={styles.scientificName}>{scientificName}</Text>

          {/* Dummy progress circle for Water Level */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Progress.Circle
                  size={100} 
                  thickness={7} 
                  progress={waterLevelProgress} 
                  color='#7EC8E3' 
                  borderWidth={0}
            >
              {/* Nested progress circle for nutrients */}
              <View style={styles.innerCircle}>
                <Progress.Circle
                  size={65} 
                  thickness={7} 
                  progress={nutrientProgress} 
                  color='#6ABE6B' 
                  borderWidth={0}
                />
              </View>
            </Progress.Circle>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.waterLevel}>Water Level</Text>
              <Text style={styles.nutrients}>Nutrients</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.healthMeter}>Garden Health</Text>
      {/* Added a dummy progress bar */}
      <Progress.Bar 
        progress={0.6} 
        width={200} 
        height={20}
        borderRadius={10}
        color='#6ABE6B'
      />
      <Text style={styles.myPlants}>
        My <Text style={styles.greenText}>Plants</Text>
      </Text>

      {/* Cards are contained here in this scroll view */}
      {/* You can modify the info as you like, eventually this should just read from the API infomation */}
      <ScrollView style={styles.scrollView}>
        {/* Card 1*/}
        <Card 
          imageSource={require('../assets/marigold.jpg')} 
          plantName="Marigold" 
          scientificName="Scientific Name" 
          waterLevelProgress={0.7} 
          nutrientProgress={0.8}   
        />

        {/* Card 2*/}
        <Card 
          imageSource={require('../assets/lettuce.jpg')} 
          plantName="Lettuce" 
          scientificName="Scientific Name" 
          waterLevelProgress={0.9} 
          nutrientProgress={0.2}   
        />

        {/* Card 3*/}
        <Card 
          imageSource={require('../assets/strawberry.jpg')} 
          plantName="Strawberry" 
          scientificName="Scientific Name" 
          waterLevelProgress={0.6} 
          nutrientProgress={0.2}  
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Slightly gray background
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  healthMeter: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#6ABE6B', // Pastel green color
  },
  myPlants: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 90,
  },

  // Card Styling
  scrollView: {
    flex: 1, 
    width: '100%', 
  },

  // Actual Card Styling 
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  cardContent: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  cardImage: {
    width: 100, 
    height: 125, 
    borderRadius: 10, 
    marginRight: 10, 
    resizeMode: 'cover', 
  },
  textContent: {
    flex: 1, 
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  scientificName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  waterLevel: {
    color: '#7EC8E3', 
    fontSize: 14, 
  },
  nutrients: {
    color: 'green', 
    fontSize: 14, 
  },

  // Style for the circular progress bars inside of the cards 
  innerCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 18, 
    left: 18, 
  },
});

