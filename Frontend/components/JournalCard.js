import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import { useTheme, ThemeProvider } from 'styled-components/native';
import * as Progress from 'react-native-progress';

const JournalCard = ({ date, smallImages, waterLevelProgress, nutrientProgress, points }) => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
        <View style={styles.container}>
            <View style={[styles.card, { backgroundColor: theme.gardenCard }]}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.dateText}>{date}</Text>
                        <View style={styles.imageContainer}>
                            {smallImages.map((image, index) => (
                                <View key={index} style={styles.smallImageContainer}>
                                    <Image
                                        source={image}
                                        style={styles.smallImage}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.endContainer}>
                        <View style={styles.progressCircles}>
                            <Progress.Circle
                                size={70}
                                thickness={7}
                                progress={waterLevelProgress}
                                color='#3FA9EB'
                                borderWidth={0}
                                unfilledColor='#DFF1F8'
                                strokeCap='round'
                            >
                                <View style={styles.innerCircle}>
                                    <Progress.Circle
                                        size={40}
                                        thickness={7}
                                        progress={nutrientProgress}
                                        color='#1DB954'
                                        borderWidth={0}
                                        unfilledColor='#D7EED8'
                                        strokeCap='round'
                                    />
                                </View>
                            </Progress.Circle>
                        </View>
                    </View>
                    <Text style={styles.pointsText}>+{points}</Text>
                </View>
            </View>
        </View>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 8,
        color: "#888",
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    smallImageContainer: {
        width: 30,
        height: 30,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 7,
        marginBottom: 5,
    },
    smallImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    endContainer: {
        width: '30%',
    },
    progressCircles: {
        alignItems: 'flex-end',
    },
    innerCircle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 15,
        left: 15,
    },
    pointsText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#1DB954',
        alignSelf: 'center',
        marginLeft: -50, 
        marginRight: 15, 
    },
});

export default JournalCard;
