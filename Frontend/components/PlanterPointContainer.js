import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PlanterPointContainer = ({ points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pointsLabelText}>Planter Points</Text>
      <View style={styles.pointsContainer}>
        <View style={styles.planterPointsIconContainer}>
          <Image
            source={require('../assets/LogoLightGreen.png')} 
            style={styles.planterPointsIcon}
          />
          <Text style={styles.planterPointsCount}>{points}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  pointsLabelText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6ABE6B', 
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D7EED8',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  planterPointsIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planterPointsIcon: {
    width: 40,
    height: 30,
    marginRight: 5,
  },
  planterPointsCount: {
    color: '#6ABE6B',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PlanterPointContainer;

