import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, Button, useColorScheme } from 'react-native';
import * as Progress from 'react-native-progress';
import { darkTheme, lightTheme } from '../App';

const HomeCard = ({ imageSource, plantName, scientificName, waterLevelProgress, nutrientProgress, onDelete }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.card, {backgroundColor: theme.gardenCard}]} onPress={toggleModal}>
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
                                color='#7EC8E3'
                                borderWidth={0}
                                unfilledColor='#DFF1F8'
                                strokeCap='round'
                            >
                                {/* Nested progress circle for nutrients */}
                                <View style={styles.innerCircle}>
                                    <Progress.Circle
                                        size={65}
                                        thickness={8}
                                        progress={nutrientProgress}
                                        color='#6ABE6B'
                                        borderWidth={0}
                                        unfilledColor='#D7EED8'
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
            </TouchableOpacity>
            {/* Additional information about the plant provided through modal */}
            <Modal
                animationType="slide"
                presentationStyle='pageSheet'
                transparent={false}
                visible={modalVisible}
                onRequestClose={toggleModal}>
                <View style={styles.modalContent}>
                    {/* Backbutton */}
                    <View style={styles.Backbutton}>
                        <Button title="Close" color="#000000" alignItems="left" onPress={() => setModalVisible(false)}></Button>
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
                            <Text style={[styles.progressText, { color: '#7EC8E3' }]}>Water</Text>
                            <Text style={[styles.progressSubText, { color: '#7EC8E3' }]}>Level</Text>
                        </View>

                        <Progress.Circle
                            size={80}
                            thickness={8}
                            progress={waterLevelProgress}
                            color='#7EC8E3'
                            borderWidth={0}
                            unfilledColor='#DFF1F8'
                            strokeCap='round'
                            showsText={true}
                            style={{ marginLeft: 20, marginRight: 20 }}
                        />
                        <View style={styles.progressItem}>
                            <Text style={[styles.progressText, { color: '#6ABE6B' }]}>Nutrient</Text>
                            <Text style={[styles.progressSubText, { color: '#6ABE6B' }]}>Level</Text>
                        </View>

                        <Progress.Circle
                            size={80}
                            thickness={8}
                            progress={nutrientProgress}
                            color='#6ABE6B'
                            borderWidth={0}
                            unfilledColor='#D7EED8'
                            strokeCap='round'
                            showsText={true}
                            style={{ marginLeft: 20, marginRight: 20 }}
                        />
                    </View>
                    
                    {/* Delete Button */}
                    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                        <Image source={require('../assets/trashbin.png')} style={styles.deleteIcon} />
                    </TouchableOpacity>
                    
                </View>
            </Modal>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingHorizontal:15,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#6ABE6B',
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
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        elevation: 20,
    },
    modalImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
        alignSelf: 'center', 
    },    
    modalTitleText: {
        fontSize: 30,
        marginBottom: 1,
        fontWeight: 'bold',
        color: '#6ABE6B',
    },
    modalSubText: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#888'
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10, 
    },
    progressItem: {
        alignItems: 'center',
    },
    progressText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center', 
    },    
    progressSubText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    Backbutton: {
        alignItems: 'left',
        marginBottom: 10,
      },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    deleteIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default HomeCard;