/*
    *File: PlantTile.js
    *Description: 
        *This file is responsible for creating and exporting the plant tile component
        *These are touchable opacities that display plant name, scientific name, and display a full size picture behind
    *Functions: n/a
*/

import React, { useState, memo } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, useColorScheme} from 'react-native';
import * as Progress from 'react-native-progress';
import { styles } from '../styles/CatalogStyles';
import { Image } from 'expo-image';
import { useTheme, ThemeProvider } from 'styled-components/native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const PlantTile = React.memo(({ plant, onSelect}) => {
const theme = useTheme();
return(
    <ThemeProvider theme={theme}>
    <View style={styles.container}>

      <TouchableOpacity onPress={() => onSelect(plant)} style={[styles.card, { backgroundColor: theme.catBorderColor, borderColor: theme.catBorderColor }]}>
        <View style={styles.cardContent}>
          {/* Display image as the full size of the card */}
          <Image source={plant.image_urls && plant.image_urls[0] ? { uri: plant.image_urls[0] } : require('../resource/flower1.jpg')} style={[styles.cardImage, { borderColor: theme.catBorderColor }]} transition={300} />
          {/*
          <View style={styles.textContent}>
            <Text style={[styles.plantName, { color: theme.text }]} numberOfLines={1} ellipsizeMode='tail'>{plant.name}</Text>
            <Text style={styles.scientificName} numberOfLines={1} ellipsizeMode='tail'>{plant.binomial_name}</Text>
          </View>
        */}
        {/* Design that is a transparent bar over the full picture */}
        </View>
          <View style={styles.shadeDet}> 
            <Text style={[styles.plantName, { color: '#fff' }]} numberOfLines={1} ellipsizeMode='tail'>{plant.name}</Text>
            <Text style={[styles.scientificName, {color: '#fff'}]} numberOfLines={1} ellipsizeMode='tail'>{plant.binomial_name}</Text>
          </View>
      </TouchableOpacity>
    </View>
    </ThemeProvider>
  );
})

export default PlantTile;
