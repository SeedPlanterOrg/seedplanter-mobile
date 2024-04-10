import React, { useState, memo } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, useColorScheme} from 'react-native';
import * as Progress from 'react-native-progress';
import { styles } from '../styles/CatalogStyles';
import { Image } from 'expo-image';
import { darkTheme, lightTheme } from '../App';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const PlantTile = React.memo(({ plant, onSelect}) => {
const colorScheme = useColorScheme();
const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
return(
    <View style={styles.container}>

      <TouchableOpacity onPress={() => onSelect(plant)} style={styles.card}
      >
        <View style={styles.cardContent}>
          <Image source={plant.image_urls && plant.image_urls[0] ? { uri: plant.image_urls[0] } : require('../resource/flower1.jpg')} style={styles.cardImage} transition={300} />
          <View style={styles.textContent}>
            <Text style={[styles.plantName, { color: theme.text }]} numberOfLines={1} ellipsizeMode='tail'>{plant.name}</Text>
            <Text style={styles.scientificName} numberOfLines={1} ellipsizeMode='tail'>{plant.binomial_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
})

export default PlantTile;
