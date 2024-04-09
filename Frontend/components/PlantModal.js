import { styles } from '../styles/CatalogStyles';
import React, { useState} from 'react';
import { Image } from 'expo-image';
import { addPlant } from '../utils/http';
import { Modal, View, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome6, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const PlantModal =({ plant, onClose, modalVisible }) => {
    console.log('Modal visible:', modalVisible);

return (
<Modal
      animationType='fade'
      transparent={true} 
      visible={modalVisible}
>
<View style={styles.ModalView}>
  <View style={styles.ModalContainer}>
    <View style={styles.Backbutton}>
      <Button title="Close" color="#000000" alignItems="left" onPress={onClose}></Button>
    </View>
    <ScrollView>
      <View style={styles.centerItems}>
        <Image source={plant.image_urls && plant.image_urls[0] ? { uri: plant.image_urls[0] } : require('../resource/flower1.jpg')} style={styles.modalImageSizing} transition={300} />
      </View>
      <View style={styles.RightText}>
        <Text style={styles.RightText}>{plant.name}</Text>
      </View>
      <View style={styles.sciNameText}>
        <Text style={styles.sciNameText}>{plant.binomial_name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: "flex-end", marginTop: -65, marginBottom: 20}}>
        <TouchableOpacity style={styles.plusButtonContainer} onPress={() => {
          let id = '65efc324a82682e507e38ebc' + 1;
          gardenPlant = {
            _id: '66003bc6d48a27039a864f5b',
            id: plant.id,
            plantId: plant.id,
            water: true,
            fertilize: true,
            prune: true,
            waterLevel: 5,
            lastWateringDate: "2024-03-21",
            fertilizerLevel: 3,
            lastFertilizingDate: "2024-03-15",
            notes: "This is a test"
          }
          try {
            const response = addPlant(gardenPlant);
            console.log(response);
          } catch (err) {
            console.error(`Failed to add plant: ${err}`);
          }

        }}>
        <AntDesign name="pluscircle" size={40} color="#68b454" />
      </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.cardGrey}>
          <Text style={styles.DescriptionText}>Description</Text>
          <Text style={styles.descriptionOfPlant2}>{plant.description}</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
        <View style={styles.card3}>
          <Text style={styles.cardText2}>{plant.care_level}</Text>
          <FontAwesome6 name="plant-wilt" size={30} color="#6ABE6B" />
          <Text style={styles.cardText3}>Care Level</Text>
        </View>
        <View style={styles.card7}>
          <Text style={styles.cardText2}>{plant.daily_watering}</Text>
          <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
          <Text style={styles.cardText3}>Daily Watering</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
        <View style={styles.card9}>
          <Text style={styles.cardText2}>{plant.light}</Text>
          <Feather name="sun" size={30} color="#ffd061" />
          <Text style={styles.cardText3}>Sun</Text>
        </View>
        <View style={styles.card10}>
          <Text style={styles.cardText2}>{plant?.zone?.hardy}</Text>
          <Feather name="map" size={30} color="#ff7878" />
          <Text style={styles.cardText3}>Hardy Zone</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.card4}>
          <Text style={styles.DescriptionText4}>Pruning Description</Text>
          <Text style={styles.descriptionOfPlant2}>{plant.pruning_description}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.cardBlue}>
          <Text style={styles.DescriptionText2}>Watering Description</Text>
          <Text style={styles.descriptionOfPlant2}>{plant.watering_description}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.cardYellow}>
          <Text style={styles.DescriptionText3}>Sunlight Description</Text>
          <Text style={styles.descriptionOfPlant2}>{plant.sunlight_description}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/*<View style={styles.cardRed}> */}
          <Text style={styles.cardText7}>Hardiness Map</Text>
        {/*</View>*/}
      </View>
      <View>
        <WebView source={{ uri: plant.hardiness_url }} style={styles.modalImageSizing2}/>
      </View>

      {/* add onPress for the adding to catalog */}
    </ScrollView>
  </View>
</View>
</Modal>
)
};

export default PlantModal;