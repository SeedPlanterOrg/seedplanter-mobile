import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, useColorScheme, FlatList, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, TextInput } from 'react-native';
// import { darkTheme, lightTheme } from '../App';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import JournalTaskCard from '../components/JournalTaskCard';
import JournalCard from '../components/JournalCard';
import PlanterPointContainer from '../components/PlanterPointContainer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useTheme, ThemeProvider } from 'styled-components/native';
import TagInput from 'react-native-tags-input';

export default function JournalScreen() {
  const theme = useTheme();
  // const colorScheme = useColorScheme();
  // const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [progressValue, setProgressValue] = useState(0.6);
  const [date, setDate] = useState(new Date()); 
  const [createPageModalVisible, setCreatePageModalVisible] = useState(false);

  const [pageTitle, setPageTitle] = useState('');
  const [pageSubjects, setPageSubjects] = useState('');
  // Functions to update plant names and scientific names
  const handlePageTitleChange = (text) => {
    setPageTitle(text);
  };
  const handlePageSubjectsChange = (text) => {
    setPageSubjects(text);
  };

  // Tag States
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
  });
  // Adds tags to the array, stops once 4 tags are present
  const updateTagState = (state) => {
    if (state.tagsArray.length <= 4) {
      setTags(state);
    }
  };  
  // Tag colors
  const tagColors = ['#F1C40F', '#E74C3C', '#2ECC71', '#3498DB'];

  // Function to handle saving inputs from the modal and adding a new JournalCard
  const createJournalCard = () => {
    const formattedDate = `${date.getFullYear()} . ${(date.getMonth() + 1).toString().padStart(2, '0')} . ${date.getDate().toString().padStart(2, '0')}`;

    const newJournalCard = {
      id: journalCardsData.length + 1, // Generate unique id for the new card
      date: formattedDate,
      smallImages: [], // Add small images if needed
      title: pageTitle,
      tags: tags.tagsArray // Add tags
    };

    // Add new JournalCard to the existing data
    setJournalCardsData([...journalCardsData, newJournalCard]);
    // Close the modal
    setCreatePageModalVisible(false);
    // Clear inputs
    setPageTitle('');
    setTags({ tag: '', tagsArray: [] });
  };

  // Functions to open and close the createPageModal
  const openCreatePageModal = () => {
    setCreatePageModalVisible(true);
  };
  const closeCreatePageModal = () => {
    setCreatePageModalVisible(false);
  };

const onChange = (e, selectedDate) => {
  setDate(selectedDate);
}

  // Dummy data for Journal Task Cards
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

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasksData.filter(task => task.id !== taskId);
    setTasksData(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <JournalTaskCard
      icon={item.icon}
      title={item.title}
      description={item.description}
      smallImage={item.smallImage}
      onDelete={() => handleDeleteTask(item.id)}
    />
  );

  // Dummy data for Journal Cards
  const [journalCardsData, setJournalCardsData] = useState([
    {
      id: 1,
      date: "2023 . 02 . 13",
      nutrientProgress: 0.9,
      waterLevelProgress: 0.7,
      points: 5,
      smallImages: [
        require('../assets/marigold.jpg'),
        require('../assets/strawberry.jpg'),
        require('../assets/lettuce.jpg'),
      ],
      title: "Title 1 - asdfa",
    },
    {
      id: 2,
      date: "2024 . 04 . 15",
      nutrientProgress: 0.4,
      waterLevelProgress: 0.6,
      points: 2,
      smallImages: [
        require('../assets/strawberry.jpg'),
        require('../assets/lettuce.jpg'),
      ],
      title: "Title 2 - asdfa",
    },
    {
      id: 3,
      date: "2024 . 04 . 15",
      nutrientProgress: 0.4,
      waterLevelProgress: 0.6,
      points: 7,
      smallImages: [
        require('../assets/strawberry.jpg'),
        require('../assets/marigold.jpg'),
      ],
      title: "Title 3 - asdfa",
    }
  ]);
  
  const renderJournalCard = ({ item }) => (
    <JournalCard
      date={item.date}
      nutrientProgress={item.nutrientProgress}
      waterLevelProgress={item.waterLevelProgress}
      points={item.points}
      smallImages={item.smallImages}
      title={item.title}
      tags={item.tags ? item.tags : []} // Check if item.tags is defined
    />
  );

  return (
    <ThemeProvider theme={theme}>
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#FFF' }, { backgroundColor: theme.gardenBackground }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.myTasksText, { color: theme.text }]}>
            My <Text style={styles.greenText}>Tasks</Text>
          </Text>
        </View>

        <View style={styles.headerSubContainer}>
          <Text style={[styles.numberTasksText, { color: theme.text }]}>
            <Text style={styles.greenText}>4</Text> Tasks Today
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
          <Text style={[styles.myJournalText, { color: theme.text }]}>
              My <Text style={styles.greenText}>Journal</Text>
          </Text>
          
        </View>

        <View style={styles.middleSubContainer}>
          {/* Date container */}
          <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Date</Text>
              <DateTimePicker
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChange}
              />
              <StatusBar style="auto" />
          </View>

          {/* Planter Points */}
          <View style={styles.planterContainer}>
            <PlanterPointContainer points={123} />
          </View>

          {/* Plus Button */}
          <TouchableOpacity style={styles.plusButtonContainer} onPress={openCreatePageModal}>
            <Image
              source={require('../assets/plus_icon.png')}
              style={[styles.plusButton, {tintColor: theme.gardenBackground}]}
            />
          </TouchableOpacity>

        </View>
        
        {/* Journal Cards Container */}
        <View style={styles.journalCardsContainer}>
          <FlatList
              data={journalCardsData}
              renderItem={renderJournalCard}
              keyExtractor={(item) => item.id.toString()}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            />
        </View>


        {/* CreatePageModal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={createPageModalVisible}
          onRequestClose={() => setCreatePageModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setCreatePageModalVisible(false)}>
            <View style={styles.ModalView}>
              <View style={[styles.selectModalContainer, { backgroundColor: theme.gardenBackground }]}>
                
                {/* Create Page */}
                <View style={[styles.headerContainer, { paddingTop: 15, paddingBottom: 25 }]}>
                  <Text style={[styles.myTasksText, { color: theme.text }]}>
                    Create <Text style={styles.greenText}>Page</Text>
                  </Text>
                </View>


                {/* Inputs for journal title and subjects */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, {color: theme.text}]}>Page Title</Text>
                  <TextInput
                    style={[styles.input, {color: theme.text}]}
                    onChangeText={handlePageTitleChange}
                    value={pageTitle}
                    placeholder="Add a journal title"
                    placeholderTextColor="#888" 
                  />
                </View>

                {/* Subjects Tags */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, {color: theme.text}]}>Subjects</Text>
                  <TagInput
                    updateState={updateTagState}
                    tags={tags}
                    placeholder="Add up to 4 subjects"
                    placeholderTextColor="#888" 
                    //leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={theme.text}/>}
                    containerStyle={styles.tagContainer}
                    inputContainerStyle={styles.tagInputContainer}
                    inputStyle={[styles.tagInputStyle, {color: theme.text}]}
                    autoCorrect={false}
                    //tagStyle={styles.tag}
                    tagStyle={[styles.tag, {backgroundColor: tagColors[tags.tagsArray.length % tagColors.length]}]}
                    tagTextStyle={styles.tagText}
                    keysForTag={', '}
                  />
                </View>

                <View style={styles.bottomContainerPageModal}>

                  {/* Today's date */}
                  <Text style={[styles.dateText, { marginTop: 10 }]}>
                    {date.getFullYear()} . {(date.getMonth() + 1).toString().padStart(2, '0')} . {date.getDate().toString().padStart(2, '0')}
                  </Text>

                  {/* Plus Button */}
                  <TouchableOpacity style={styles.plusButtonContainerPageModal} onPress={createJournalCard}>
                    <Image
                      source={require('../assets/plus_icon.png')}
                      style={[styles.plusButton, {tintColor: theme.gardenBackground}]}
                    />
                  </TouchableOpacity>
                </View>

                {/* Inner view to prevent closing when touched 
                <TouchableOpacity onPress={() => {}} style={{ flex: 1, width: '100%'}} />
                */}

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


      </View>
    </SafeAreaView>
    </ThemeProvider>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  middleSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  myTasksText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  myJournalText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15, 
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
  planterContainer: {
    marginLeft: 'auto',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  dateText: {
    fontSize: 16,
    color: '#888',
    marginRight: 10,
  },
  journalCardsContainer: {
    width: '100%',
    height: '35%',
  }, 
  plusButtonContainer: {
    marginLeft: 'auto',
    marginTop: 30,
    backgroundColor: '#1DB954',
    borderRadius: 20,
  },
  plusButton: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  ModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  selectModalContainer: {
    backgroundColor: '#fff',
    height: 400,
    width: '90%',
    borderRadius: 20,
    elevation: 20,
  },
  Backbutton: {
    marginTop: 10,
    alignSelf: 'left', 
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#1DB954',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  bottomContainerPageModal: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    paddingHorizontal: 15, 
    paddingBottom: 15, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },  
  plusButtonContainerPageModal: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    marginLeft: 'auto',
  },
  tagContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignItems: 'center', 
    width: '100%', 
    paddingHorizontal: -10, 
  },
  tagInputContainer: {
    borderWidth: 1.5,
    borderColor: '#1DB954',
    borderRadius: 15,
  },
  tagInputStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tag: {
    borderRadius: 10,
    borderWidth: 0,
    width: 125,
    height: 30,
    backgroundColor: '#1DB954', 
    marginHorizontal: 18, 
    marginVertical: 10, 
  },
  tagText: {
    fontSize: 16,
    color: '#FFF', 
    fontWeight: 'bold',
  },
});
