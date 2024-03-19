import React from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
//import DatePicker from 'react-native-modern-datepicker';
import Slider from "@react-native-community/slider"


const AddPlantCard = ({ notifyMe, toggleNotifyMe, headerText, imageSource }) => {
    const [sliderState, setSliderState] = React.useState(0);

    // Currently running into issues with DatePicker

    //const [date, setDate] = useState(false)

    //function handleChange (propDate) {
    //    setDate(propDate)
    //}


    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer} >
                {/* Render the image if imageSource is provided */}
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
            </View>


            {/*
            <DatePicker 
                mode='calendar'
                selected={date}
                onDateChange={handleChange}
            />
            */}

        </View>
    );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fcfafa',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    padding: 20,
    marginTop: 5,
    marginHorizontal: -5,
    marginBottom: 5,
    shadowRadius: 2,
    alignItems: 'center', 
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5, 
  },
  toggleContainer: {
    flexDirection: 'row',
    marginLeft: 60,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 6,
  },
  image: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain', 
    marginRight: 5, 
  },
  headerContainer: {
    flexDirection: 'row',
  },
  sliderContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 160,
    marginTop: 10,
  },
  slider: {
    width: 150,
    height: 40,
  },
  sliderValue: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 160,
    position: 'absolute',
    left: 0,
  },
});


export default AddPlantCard;


