import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';

const PlantTile = ({ imageSource, plantName, scientificName }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    {imageSource && <Image source={imageSource} style={styles.cardImage} />}
                    <View style={styles.textContent}>
                        <Text style={styles.plantName}>{plantName}</Text>
                        <Text style={styles.scientificName}>{scientificName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
    card: {
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fcfafa',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 2,
        width: 165,
        height: 230,
        marginTop: 10,
        marginHorizontal: -15,
        marginVertical: -40,
    },
    cardContent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        width: 125,
        height: 125,
        borderRadius: 15,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    textContent: {
        flex: 1,
        alignItems: 'center',
    },
    plantName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
    },
    scientificName: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
});

export default PlantTile;
