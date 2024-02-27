import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';

const HomeCard = ({ imageSource, plantName, scientificName, waterLevelProgress, nutrientProgress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    {imageSource && <Image source={imageSource} style={styles.cardImage} />}
                    <View style={styles.textContent}>
                        <Text style={styles.plantName}>{plantName}</Text>
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
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingHorizontal: 25,
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
        backgroundColor: '#fcfafa',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        padding: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: -25,
        marginBottom: -20,
        shadowRadius: 2,
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
        color: 'green',
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
});

export default HomeCard;