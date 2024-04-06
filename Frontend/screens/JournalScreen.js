import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, useColorScheme, FlatList } from 'react-native';
import { darkTheme, lightTheme } from '../App';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import JournalTaskCard from '../components/JournalTaskCard';

export default function JournalScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [progressValue, setProgressValue] = useState(0.6);

  // dummy data
  const tasksData = [
    {
      id: 1,
      icon: require('../assets/rain.png'),
      title: "Water",
      description: "Strawberries",
      smallImage: require('../assets/strawberry.jpg')
    },
    {
      id: 2,
      icon: require('../assets/leaf.png'),
      title: "Fertilize",
      description: "Marigolds",
      smallImage: require('../assets/marigold.jpg')
    }
  ];

  const renderItem = ({ item }) => (
    <JournalTaskCard
      icon={item.icon}
      title={item.title}
      description={item.description}
      smallImage={item.smallImage}
    />
  );

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#FFF' }, { backgroundColor: theme.gardenBackground }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.myTasksText, { color: theme.text }]}>
            My <Text style={styles.greenText}>Tasks</Text>
          </Text>
        </View>

        <View style={styles.headerSubContainer}>
          <Text style={[styles.numberTasksText, { color: theme.text }]}>
            <Text style={styles.greenText}>4</Text> Tasks today
          </Text>

          <Progress.Bar
            progress={progressValue}
            width={175}
            height={25}
            borderRadius={20}
            color="#1DB954"
            unfilledColor={theme.progUnfill}
            borderWidth={0}
          />
          <Text style={styles.progressValueText}>{`${Math.round(progressValue * 100)}%`}</Text>
        </View>

        {/* FlatList for JournalTaskCards */}
        <View style={styles.flatListContainer}>
          <FlatList
            data={tasksData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.middleContainer}>
          <Text style={[styles.myTasksText, { color: theme.text }]}>
              My <Text style={styles.greenText}>Journal</Text>
          </Text>
        </View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  middleContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 15,
  },
  myTasksText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  greenText: {
    color: '#1DB954',
  },
  headerSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  numberTasksText: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 15,
  },
  progressValueText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -10 }],
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal:15,
  },
  flatListContainer: {
    height: '35%', 
    width: '100%',
  },
});
