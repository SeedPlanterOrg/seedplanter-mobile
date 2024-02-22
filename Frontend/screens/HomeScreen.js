import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Card Component 
const Card = ({ children, imageSource }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        {imageSource && <Image source={imageSource} style={styles.cardImage} />}
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        My <Text style={styles.greenText}>Garden</Text>
      </Text>
      <Text style={styles.healthMeter}>Garden Health</Text>
      <Text style={styles.myPlants}>
        My <Text style={styles.greenText}>Plants</Text>
      </Text>

      <ScrollView style={styles.scrollView}>
        {/* Cards */}
        <Card imageSource={require('../assets/marigold.jpg')}>
          <Text>
            <Text>Marigold{"\n"}</Text>
            <Text style={styles.scientificName}>scientific name{"\n"}{"\n"}</Text>
            <Text style={styles.waterLevel}>Water Level ---------------------{"\n"}</Text>
            <Text style={styles.nutrients}>Nutrients -----------------------</Text>
          </Text>
        </Card>

        <Card imageSource={require('../assets/lettuce.jpg')}>
          <Text>
            <Text>Lettuce{"\n"}</Text>
            <Text style={styles.scientificName}>scientific name{"\n"}{"\n"}</Text>
            <Text style={styles.waterLevel}>Water Level ---------------------{"\n"}</Text>
            <Text style={styles.nutrients}>Nutrients -----------------------</Text>
          </Text>
        </Card>

        <Card imageSource={require('../assets/strawberry.jpg')}>
          <Text>
            <Text>Strawberry{"\n"}</Text>
            <Text style={styles.scientificName}>scientific name{"\n"}{"\n"}</Text>
            <Text style={styles.waterLevel}>Water Level ---------------------{"\n"}</Text>
            <Text style={styles.nutrients}>Nutrients -----------------------</Text>
          </Text>
        </Card>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Slightly gray background
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  greenText: {
    color: '#6ABE6B', // Pastel green color
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
  scientificName: {
    color: '#888', 
    fontSize: 16, 
  },
  waterLevel: {
    color: 'lightblue', 
    fontSize: 12, 
  },
  nutrients: {
    color: 'green', 
    fontSize: 12, 
  },

  // Bottom Bar Styling (Will probably move to a different file)
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '118%',
    backgroundColor: '#fff', 
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    padding: 10,
  },
  centerButton: {
    alignItems: 'center',
  },
  centerButtonInner: {
    backgroundColor: 'green',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

