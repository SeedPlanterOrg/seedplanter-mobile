import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal, Button, useColorScheme, Animated } from 'react-native';
import * as Progress from 'react-native-progress';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { Image } from 'expo-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
            <TouchableOpacity onPress={toggleModal} activeOpacity={1}>
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
                            <View style={[styles.modalContent, { backgroundColor: theme.gardenCard }]}>
                                {/* Backbutton */}
                                <View style={styles.Backbutton}>
                                    <Button title="Close" color={theme.text} alignItems="left" onPress={() => setModalVisible(false)}></Button>
                                </View>
                                
                                {imageSource && <Image source={imageSource} style={styles.modalImage} />}
                                <Text style={styles.modalTitleText}>{plantName}</Text>
                                <Text style={styles.modalSubText}>{scientificName}</Text>
                                
                                {/* Small Note: To make the showsText property work, I had to manually adjust the Circle.js file
                                in the react-native-progress folder in node_modules. There was a bug in the library where this would
                                only display 0% no matter what you did.
                                
                                It solved by changing
                                {formatText(progressValue)}

                                in  Circle.js (node_modules\react-native-progress\Circle.js) to

                                {progress ? formatText(progress._value) : this.forceUpdate()} 
                                */}
                                
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressItem}>
                                        <Text style={[styles.progressText, { color: '#3FA9EB' }]}>Water</Text>
                                        <Text style={[styles.progressSubText, { color: '#3FA9EB' }]}>Level</Text>
                                    </View>

                                    <Progress.Circle
                                        size={80}
                                        thickness={8}
                                        progress={waterLevelProgress}
                                        color='#3FA9EB'
                                        borderWidth={0}
                                        unfilledColor={theme.progBlueUnfill}
                                        strokeCap='round'
                                        showsText={true}
                                        style={{ marginLeft: 20, marginRight: 20 }}
                                    />
                                    <View style={styles.progressItem}>
                                        <Text style={[styles.progressText, { color: '#1DB954' }]}>Nutrient</Text>
                                        <Text style={[styles.progressSubText, { color: '#1DB954' }]}>Level</Text>
                                    </View>

                                    <Progress.Circle
                                        size={80}
                                        thickness={8}
                                        progress={nutrientProgress}
                                        color='#1DB954'
                                        borderWidth={0}
                                        unfilledColor={theme.progUnfill}
                                        strokeCap='round'
                                        showsText={true}
                                        style={{ marginLeft: 20, marginRight: 20 }}
                                    />
                                </View>
                                
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
        width: 225,
        height: 225,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
        alignSelf: 'center', 
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
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        marginTop: 10, 
        marginLeft: 15, 
    },
    progressItem: {
        alignItems: 'center',
    },
    progressText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 20,
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
});

export default HomeCard;