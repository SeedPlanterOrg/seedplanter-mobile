/*
    *File: PlantModal.js
    *Description: 
        *This modal displays various plant information that the user needs to determine wether to add to the garden or not
        *It has image view, text view, and web view to display hardiness map
        *Fetches the data from the database
    *Functions: n/a
*/

import { styles } from '../styles/CatalogStyles';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { addPlant } from '../utils/http';
import { Modal, View, Button, ScrollView, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome6, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const PlantModal = ({ plant, onClose, modalVisible }) => {
    console.log('Modal visible:', modalVisible);
    const theme = useTheme();
    // set and get
    const [userId, setUserId] = useState(null);
    const [gardenId, setGardenId] = useState(null);

    // fetch plant data 
    useEffect(() => {
        const fetchGardenId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            const gardenId = await AsyncStorage.getItem('gardenId');
            setUserId(userId);  
            setGardenId(gardenId); 
        };

        fetchGardenId();
    }, []);





    return (
        <ThemeProvider theme={theme}>
            <Modal
                animationType="slide"
                presentationStyle='pageSheet'
                transparent={false}
                visible={modalVisible}
            >

                <View style={[styles.ModalContainer, { backgroundColor: theme.gardenBackground }]}>

                    {/* Backbutton */}
                    <View style={[styles.Backbutton, { backgroundColor: theme.navbar }]}>
                        <Button title="Close" color={theme.text} alignItems="left" onPress={onClose}></Button>
                    </View>

                    <ScrollView>
                        {/* Image on the modal */}
                        <View style={styles.centerItems}>
                            <Image source={plant.image_urls && plant.image_urls[0] ? { uri: plant.image_urls[0] } : require('../resource/flower1.jpg')} style={[styles.modalImageSizing, { borderColor: theme.catBorderColor }]} transition={300} />
                        </View>
                        {/* Plant name */}
                        <View style={styles.RightText}>
                            <Text style={styles.RightText}>{plant.name}</Text>
                        </View>
                        {/* Scientific name */}
                        <View style={styles.sciNameText}>
                            <Text style={styles.sciNameText}>{plant.binomial_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: "flex-end", marginTop: -65, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.plusButtonContainer} onPress={() => {
                                // let id = '65efc324a82682e507e38ebc' + 1;
                                gardenPlant = {
                                    gardenId: gardenId, //async storage
                                    userId: userId,     //async storage
                                    plantId: plant.id,
                                    water: true,
                                    fertilize: true,
                                    waterLevel: 0.5,
                                    lastWateringDate: new Date(),
                                    wateringFrequency: "daily", //test
                                    wateringInterval: 250, //test
                                    fertilizerLevel: 0.5,
                                    lastFertilizingDate: new Date(),
                                    fertilizingFrequency: "weekly", //test
                                    fertilizingInterval: 7, //test
                                    notes: "This is a test"
                                }
                                try {
                                    const response = addPlant(gardenPlant);
                                    console.log(response);
                                } catch (err) {
                                    console.error(`Failed to add plant: ${err}`);
                                }

                            }}>
                                <AntDesign name="pluscircle" size={35} color="#1DB954" />
                            </TouchableOpacity>
                        </View>

                        <View />

                        {/*<View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />*/}

                        {/* Description */}
                        <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <Text style={[styles.DescriptionText, { color: theme.text }]}>Description</Text>
                            <Text style={[styles.descriptionOfPlant2, { color: theme.text }]}>{plant.description}</Text>
                        </View>

                        <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                        <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                            {/* Circle 1 */}
                            <View style={[styles.card3, { backgroundColor: theme.gardenBackground }]}>
                                <Text style={[styles.cardText2, { color: theme.text }]}>{plant.care_level}</Text>
                                <FontAwesome6 name="plant-wilt" size={30} color="#1DB954" />
                                <Text style={styles.cardText3}>Care Level</Text>
                            </View>
                            {/* Circle 2 */}
                            <View style={[styles.card7, { backgroundColor: theme.gardenBackground }]}>
                                <Text style={[styles.cardText2, { color: theme.text }]}>{plant.daily_watering}</Text>
                                <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
                                <Text style={styles.cardText3}>Daily Watering</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                            {/* Circle 3 */}
                            <View style={[styles.card9, { backgroundColor: theme.gardenBackground }]}>
                                <Text style={[styles.cardText2, { color: theme.text }]}>{plant.light}</Text>
                                <Feather name="sun" size={30} color="#ffd061" />
                                <Text style={styles.cardText3}>Sun</Text>
                            </View>

                            {/* Circle 4 */}
                            <View style={[styles.card10, { backgroundColor: theme.gardenBackground }]}>
                                <Text style={[styles.cardText2, { color: theme.text }]}>{plant?.zone?.hardy}</Text>
                                <Feather name="map" size={30} color="#ff7878" />
                                <Text style={styles.cardText3}>Hardy Zone</Text>
                            </View>
                        </View>

                        <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                        {/* Pruing Description */}
                        <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }} >
                                <View style={[styles.conCounter, { borderColor: "#1DB954" }]}>
                                    <FontAwesome6 name="plant-wilt" size={30} color="#1DB954"/>
                                </View>
                                <Text style={styles.DescriptionText4}>Pruning</Text>
                            </View>
                            <Text style={[styles.descriptionOfPlant2, { color: theme.text }]}>{plant.pruning_description}</Text>
                        </View>

                        {/*<View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />*/}

                        {/* Watering Description */}
                        <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
                                <View style={[styles.conCounter, { borderColor: "#7EC8E3" }]}>
                                    <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
                                </View>
                                <Text style={styles.DescriptionText2}>Watering</Text>
                            </View>
                            <Text style={[styles.descriptionOfPlant2, { color: theme.text }]}>{plant.watering_description}</Text>
                        </View>

                        {/*<View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />*/}

                        {/* Sunlight Description */}
                        <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
                                <View style={[styles.conCounter, { borderColor: "#ffd061" }]}>
                                    <Feather name="sun" size={30} color="#ffd061" />
                                </View>
                                <Text style={styles.DescriptionText3}>Sunlight</Text>
                            </View>
                            <Text style={[styles.descriptionOfPlant2, { color: theme.text }]}>{plant.sunlight_description}</Text>
                        </View>

                        <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            {/*<View style={styles.cardRed}> */}
                            <Text style={styles.cardText7}>Hardiness Map</Text>
                            {/*</View>*/}
                        </View>

                        {/* Webview to dislay the hardiness map */}
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <WebView source={{ uri: plant.hardiness_url }} style={styles.modalImageSizing2} />
                        </View>

                        <View style={{ margin: 40, }} />

                        {/* add onPress for the adding to catalog */}
                    </ScrollView>
                </View>
            </Modal>
        </ThemeProvider>
    )
};

export default PlantModal;
