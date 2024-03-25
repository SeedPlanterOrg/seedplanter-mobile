import React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'

const AddPlantCard = ({ notifyMe, toggleNotifyMe, headerText, imageSource, lastDateText }) => {
    const [sliderState, setSliderState] = React.useState(0);
    const [date, setDate] = useState(new Date()); 
    const [selected, setSelected] = React.useState("");

    const data = [
        {key:'1', value:'Weekly' },
        {key:'2', value:'Monthly'},
        {key:'3', value:'Yearly'},
    ]

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

            <View style={styles.middleContainer}>
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>Remind me</Text>
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
                </View>
                    <View style={styles.selectListContainer}>
                        <SelectList 
                            setSelected={(val) => setSelected(val)} 
                            data={data} 
                            save="value"
                            search={false}
                            maxHeight={80}
                            defaultOption={1}
                            placeholder='Weekly'
                            boxStyles={styles.selectBoxStyle}
                            dropdownStyles={styles.selectDropDownStyle}
                        />
                    </View>
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
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        paddingBottom: 30, 
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowRadius: 3,
        shadowOpacity: 0.4,
        elevation: 3,
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
    middleContainer: {
        flexDirection: 'row',
        marginTop: 5,
        position: 'relative',
    },
    sliderContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginRight: 180, 
        justifyContent: 'space-between',
    },
    selectListContainer: {
        position: 'absolute',
        top: 15,
        right: 0,
    },
    selectBoxStyle: {
        backgroundColor:'#D7EED8',
        marginRight: 10,
        borderRadius: 10, 
        borderWidth: 0,
        width: 120,
    },
    selectDropDownStyle: {
        backgroundColor:'#D7EED8',
        marginRight: 10,
        borderRadius: 10, 
        borderWidth: 0,
        width: 120,
    },
    slider: {
        width: 130,
        height: 40,
    },
    sliderValue: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    sliderText: {
        fontSize: 16,
        color: '#888',
    },
    dateContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginRight: 15,
        marginLeft: 180,
    },
    dateText: {
        position: 'absolute',
        fontSize: 16,
        color: '#888',
        right: 160, 
        top: 10, 
    },
});

export default AddPlantCard;



