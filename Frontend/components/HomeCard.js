/*
    *File: HomeCard.js
    *Description: 
      As mentioned in the HomeScreen.js description, HomeCard.js is the component that makes up the card on the homescreen. 

      In the "My Plants" section of the home screen, users can see their custom plants or plants from the catalog, presented in a card format. 
      These cards come from the HomeCard.js component that I created for ease of use. The plant cards include images of the plant, the plant name, 
      the scientifc name, progress circles which correlate with the plant's current water level and nutrient level. 

      Tapping the cards will result in a modal popup that gives the user a more in-depth view of their plant with information that comes from the 
      catalog screen (Perenual database to be exact). 

      If a user decides they do not want the plant on the home screen anymore, they may swipe left to delete the card. 

    *Functions:
        toggleModal()          - Toggles the modal visability
        renderRightActions()   - Used for the swipe to delete functionality 
      
*/

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Modal, Button, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { Image } from 'expo-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { FontAwesome6, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

const HomeCard = ({ imageSource, plantName, scientificName, waterLevelProgress, nutrientProgress, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderRightActions = (progress, dragAnimatedValue) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    
    return (
      <RectButton 
        style={[styles.deleteButton, { backgroundColor: 'red' }]} 
        onPress={onDelete}
      >
        <Animated.View
          style={{
            transform: [{ translateX: trans }],
          }}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  return (
    <Swipeable 
        renderRightActions={renderRightActions} 
        leftThreshold={30}
    >
      <TouchableOpacity onPress={toggleModal} activeOpacity={0.2}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <View style={[styles.card, {backgroundColor: theme.gardenCard}]}>
              <View style={styles.cardContent}>
                  {imageSource && <Image source={imageSource} style={styles.cardImage} />}
                  <View style={[styles.textContent, {color: theme.text}]}>
                      <Text style={[styles.plantName, {color: theme.text}]}>{plantName}</Text>
                      <Text style={styles.scientificName}>{scientificName}</Text>

                      {/* Dummy progress circle for Water Level */}
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Progress.Circle
                              size={100}
                              thickness={8}
                              progress={waterLevelProgress}
                              color='#3FA9EB'
                              borderWidth={0}
                              unfilledColor={theme.progBlueUnfill}
                              strokeCap='round'
                          >
                              {/* Nested progress circle for nutrients */}
                              <View style={styles.innerCircle}>
                                  <Progress.Circle
                                      size={65}
                                      thickness={8}
                                      progress={nutrientProgress}
                                      color='#1DB954'
                                      borderWidth={0}
                                      unfilledColor={theme.progUnfill}
                                      strokeCap='round'
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
          </View>
          {/* Additional information about the plant provided through modal */}
          <Modal
              animationType="slide"
              presentationStyle='pageSheet'
              transparent={false}
              visible={modalVisible}
              onRequestClose={toggleModal}>
              <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
                  {/* Backbutton */}
                  <View style={styles.Backbutton}>
                      <Button title="Close" color={theme.text} alignItems="left" onPress={() => setModalVisible(false)}></Button>
                  </View>
                  
                  <ScrollView>
                      {imageSource && <Image source={imageSource} style={styles.modalImage} />}

                      <View style={styles.RightText}>
                          <Text style={styles.RightText}>{plantName}</Text>
                      </View>
                      <View style={styles.sciNameText}>
                          <Text style={styles.sciNameText}>{scientificName}</Text>
                      </View>
                      
                      {/* Small Note: To make the showsText property work, I had to manually adjust the Circle.js file
                      in the react-native-progress folder in node_modules. There was a bug in the library where this would
                      only display 0% no matter what you did.
                      
                      It solved by changing
                      {formatText(progressValue)}

                      in  Circle.js (node_modules\react-native-progress\Circle.js) to

                      {progress ? formatText(progress._value) : this.forceUpdate()} 
                      */}
                      
                      <View style={styles.progressContainer}>
                          <View>
                              <Text style={[styles.progressText, { color: '#3FA9EB' }]}>Water</Text>
                              <Text style={[styles.progressSubText, { color: '#3FA9EB' }]}>Level</Text>
                          </View>

                          <Progress.Circle
                              size={80}
                              thickness={10}
                              progress={waterLevelProgress}
                              color='#3FA9EB'
                              borderWidth={0}
                              unfilledColor={theme.progBlueUnfill}
                              strokeCap='round'
                              showsText={true}
                              style={{ marginHorizontal: 20 }}
                          />

                          <Progress.Circle
                              size={80}
                              thickness={10}
                              progress={nutrientProgress}
                              color='#1DB954'
                              borderWidth={0}
                              unfilledColor={theme.progUnfill}
                              strokeCap='round'
                              showsText={true}
                              style={{ marginHorizontal: 20 }}
                          />

                          <View>
                              <Text style={[styles.progressText, { color: '#1DB954' }]}>Nutrient</Text>
                              <Text style={[styles.progressSubText, { color: '#1DB954' }]}>Level</Text>
                          </View>
                      </View>

                      {/* Description */}
                      <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                          <Text style={[styles.descriptionHeader, { color: theme.text }]}>Description</Text>
                          <Text style={[styles.plantDescriptionText, { color: theme.text }]}>N/A</Text>
                      </View>

                      <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                          {/* Circle 1 */}
                          <View style={[styles.circleContainer, { backgroundColor: theme.gardenBackground, borderColor: "#1DB954"  }]}>
                              <Text style={[styles.circleTextHeader, { color: theme.text }]}>N/A</Text>
                              <FontAwesome6 name="plant-wilt" size={30} color="#1DB954" />
                              <Text style={styles.circleTextSub}>Care Level</Text>
                          </View>
                          {/* Circle 2 */}
                          <View style={[styles.circleContainer, { backgroundColor: theme.gardenBackground, borderColor: "#7EC8E3" }]}>
                              <Text style={[styles.circleTextHeader, { color: theme.text }]}>N/A</Text>
                              <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
                              <Text style={styles.circleTextSub}>Daily Watering</Text>
                          </View>
                      </View>

                      <View style={{ justifyContent: 'center', flexDirection: 'row', }} >
                          {/* Circle 3 */}
                          <View style={[styles.circleContainer, { backgroundColor: theme.gardenBackground, borderColor: "#ffd061" }]}>
                              <Text style={[styles.circleTextHeader, { color: theme.text }]}>N/A</Text>
                              <Feather name="sun" size={30} color="#ffd061" />
                              <Text style={styles.circleTextSub}>Sun</Text>
                          </View>

                          {/* Circle 4 */}
                          <View style={[styles.circleContainer, { backgroundColor: theme.gardenBackground, borderColor: "#ff7878" }]}>
                              <Text style={[styles.circleTextHeader, { color: theme.text }]}>N/A</Text>
                              <Feather name="map" size={30} color="#ff7878" />
                              <Text style={styles.circleTextSub}>Hardy Zone</Text>
                          </View>
                      </View>

                      <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                      {/* Pruing Description */}
                      <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }} >
                              <View style={[styles.iconContainer, { borderColor: "#1DB954" }]}>
                                  <FontAwesome6 name="plant-wilt" size={30} color="#1DB954"/>
                              </View>
                              <Text style={[styles.descriptionHeader, { color: '#1DB954' }]}>Pruning</Text>
                          </View>
                          <Text style={[styles.plantDescriptionText, { color: theme.text }]}>N/A</Text>
                      </View>


                      {/* Watering Description */}
                      <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
                              <View style={[styles.iconContainer, { borderColor: "#7EC8E3" }]}>
                                  <MaterialCommunityIcons name="water" size={30} color="#7EC8E3" />
                              </View>
                              <Text style={[styles.descriptionHeader, { color: '#7EC8E3' }]}>Watering</Text>
                          </View>
                          <Text style={[styles.plantDescriptionText, { color: theme.text }]}>N/A</Text>
                      </View>

                      {/* Sunlight Description */}
                      <View style={{ alignItems: 'left', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
                              <View style={[styles.iconContainer, { borderColor: "#ffd061" }]}>
                                  <Feather name="sun" size={30} color="#ffd061" />
                              </View>
                              <Text style={[styles.descriptionHeader, { color: '#ffd061' }]}>Sunlight</Text>
                          </View>
                          <Text style={[styles.plantDescriptionText, { color: theme.text }]}>N/A</Text>
                      </View>

                      <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

                      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                          <Text style={styles.cardText7}>Hardiness Map</Text>
                      </View>
                      
                      {/*
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          <WebView source={{ uri: plant.hardiness_url }} style={styles.modalImageSizing2} />
                      </View>
                      */}

                      <View style={{ margin: 40, }} />

                  </ScrollView>
                  
                  
              </View>
            </Modal>
          </View>
        </ThemeProvider>
      </TouchableOpacity>
    </Swipeable>
  );
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      paddingBottom: 10,
      paddingTop: 10,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },
  myPlants: {
      fontSize: 23,
      fontWeight: 'bold',
      marginTop: 90,
  },
  scrollView: {
      flex: 1,
      width: '100%',
  },
  card: {
      borderRadius: 10,
      elevation: 3,
      backgroundColor: '#fff',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
  },
  cardContent: {
      flexDirection: 'row',
  },
  cardImage: {
      width: 125,
      height: 150,
      borderRadius: 10,
      marginRight: 20,
      resizeMode: 'cover',
  },
  textContent: {
      flex: 1,
  },
  plantName: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  scientificName: {
      fontSize: 14,
      color: '#888',
      marginBottom: 10,
      marginTop: 5,
  },
  waterLevel: {
      color: '#3FA9EB',
      fontSize: 14,
  },
  nutrients: {
      color: '#1DB954',
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
  modalContent: {
      flex: 1, 
      backgroundColor: '#fff',
  },
  modalImage: {
      width: '100%',
      height: 375,
      resizeMode: 'cover',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
  },    
  modalTitleText: {
      fontSize: 30,
      marginBottom: 1,
      marginLeft: 15, 
      fontWeight: 'bold',
      color: '#1DB954',
  },
  modalSubText: {
      fontSize: 15,
      marginBottom: 10,
      marginLeft: 15, 
      fontWeight: 'bold',
      color: '#888'
  },
  progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 30, 
  },
  progressText: {
      fontSize: 14,
      fontWeight: 'bold',
  },    
  progressSubText: {
      fontSize: 14,
      fontWeight: 'bold',
  },
  Backbutton: {
      alignItems: 'left',
      marginTop: 10,
      marginLeft: 10,
  },
  deleteButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      borderRadius: 10, 
      marginVertical: 10, 
      marginLeft: 10, 
      marginRight: 15,
      overflow: 'hidden', 
  },
  deleteButtonText: {
      fontSize: 17,
      fontWeight: '500',
      color: "#FFF",
  },
  RightText: {
      justifyContent: 'center',
      fontSize: 30,
      marginTop: 10,
      marginLeft: 15,
      fontWeight: 'bold',
      color: '#1DB954',
      textAlign: 'left',
  },
  sciNameText: {
      justifyContent: 'center',
      fontSize: 15,
      marginBottom: 20,
      marginTop: 5,
      marginLeft: 15,
      color: '#A8A8A8',
      textAlign: 'left',
  },
  descriptionHeader: {
      fontSize: 20,
      marginLeft: 10,
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom: 5,
  },
  plantDescriptionText: {
      justifyContent: 'center',
      fontSize: 13,
      marginBottom: 20,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      color: '#707070',
      textAlign: 'justify',
      alignItems: 'center',
  },
  circleContainer: {
      borderRadius: 100,
      elevation: 3,
      backgroundColor: '#f2f7fc',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.2,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 2,
      width: 125,
      height: 125,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
      borderWidth: 2
    },
    circleTextHeader: {
      justifyContent: 'center',
      fontSize: 16,
      color: '#000000',
      textAlign: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    circleTextSub: {
      justifyContent: 'center',
      fontSize: 8,
      color: '#707070',
      textAlign: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      marginTop: 5,
    },
    iconContainer: {
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 2, 
      padding: 10, 
      width: 55, 
      height: 55, 
      borderRadius: 20,
    },
    cardText7: {
      marginBottom: 5,
      justifyContent: 'center',
      fontSize: 20,
      color: '#ff7878',
      fontWeight: 'normal',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 5,
    },
});

export default HomeCard;