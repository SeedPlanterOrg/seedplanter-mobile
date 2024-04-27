/*
    *File: PlanterPointContainer.js
    *Description: 
      Houses current plant streak, that's it
    *Functions:
        N/A
*/

import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import { useTheme, ThemeProvider } from 'styled-components/native';

const PlanterPointContainer = ({ points }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
    <View style={styles.container}>
      <Text style={styles.pointsLabelText}>Streak</Text>
      <View style={[styles.pointsContainer, { backgroundColor: theme.progUnfill }]}>
        <View style={styles.planterPointsIconContainer}>
          <Image
            source={require('../assets/LogoLightGreen.png')} 
            style={[styles.planterPointsIcon, { tintColor: '#1DB954' }]}
          />
          <Text style={styles.planterPointsCount}>{points}</Text>
        </View>
      </View>
    </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pointsLabelText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1DB954', 
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
  },
  planterPointsCount: {
    color: '#1DB954',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5, 
  },
});

export default PlanterPointContainer;

