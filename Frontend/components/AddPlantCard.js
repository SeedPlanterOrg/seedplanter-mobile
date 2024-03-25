import React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPlantCard = ({ notifyMe, toggleNotifyMe, headerText, imageSource, lastDateText }) => {
    const [sliderState, setSliderState] = React.useState(0);
    const [date, setDate] = useState(new Date()); 

    const onChange = (e, selectedDate) => {
        setDate(selectedDate);
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer} >
                {imageSource && <Image source={imageSource} style={styles.image} />}
                <Text style={styles.cardText}>{headerText}</Text>
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleText}>Notify Me</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#6ABE6B' }}
                        thumbColor={notifyMe ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotifyMe}
                        value={notifyMe}
                    />
                </View>
            </View>

            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    value={sliderState}
                    onValueChange={(value) => setSliderState(value)}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#6ABE6B"
                    maximumTrackTintColor="#000000"
                    step={1}
                />
                <Text style={styles.sliderValue}>{sliderState}</Text>
                <Text style={styles.sliderText}>times</Text>
                <Text style={styles.sliderDropDownText}>weekly</Text>
            </View>

            {/* Date container, currently not implemented */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Last {lastDateText} date </Text>
                <DateTimePicker
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                />
                <StatusBar style="auto" />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        padding: 20,
        marginTop: 5,
        marginHorizontal: -5,
        marginBottom: 5,
        shadowRadius: 3,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        marginTop: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginLeft: 60,
        alignItems: 'center',
    },
    toggleText: {
        fontSize: 16,
        marginRight: 10,
        color: '#888',
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 5,
        marginTop: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    sliderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginRight: 45,
    },
    slider: {
        width: 130,
        height: 40,
        marginLeft: 10, 
        marginRight: 10, 
    },
    sliderValue: {
        position: 'absolute',
        top: 5,
        right: 106,
        fontSize: 23,
        fontWeight: 'bold',
    },
    sliderText: {
        fontSize: 15,
        marginLeft: 30, 
        marginRight: 10, 
    },
    sliderDropDownText: {
        fontSize: 15,
    },
    dateContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginRight: 5,
        marginLeft: 180,
    },
    dateText: {
        position: 'absolute',
        fontSize: 16,
        color: '#888',
        right: 175, 
        top: 10, 
    },
});

export default AddPlantCard;



