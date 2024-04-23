import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import JournalTaskCard from '../components/JournalTaskCard';
import JournalCard from '../components/JournalCard';
import PlanterPointContainer from '../components/PlanterPointContainer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { createJournalEntry,  updateJournalEntry, getJournal } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalScreen() {
  const theme = useTheme();

  // Progress Bar Value
  const [progressValue, setProgressValue] = useState(0.6);
  const [date, setDate] = useState(new Date()); 

  const [createPageModalVisible, setCreatePageModalVisible] = useState(false);
  const [modalMarginBottom, setModalMarginBottom] = useState(0);

  // These are used to move the modal up when the keyboard is present
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const _keyboardDidShow = (event) => {
    setModalMarginBottom(250);
  };
  const _keyboardDidHide = () => {
    setModalMarginBottom(0);
  };

  // Title Const 
  const [pageTitle, setPageTitle] = useState('');

  // Functions to update the title of a page
  const handlePageTitleChange = (text) => {
    setPageTitle(text);
  };

  // Updates tags shown in the modal
const handleTagsChange = (text) => {
  // Split comma-separated tags and filter out empty strings
  const tagsArray = text.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

  if (tagsArray.length > 4) {
    return;
  }
  setTags({
    tag: text,
    tagsArray: tagsArray
  });
};

  // Tag States
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
  });

  // Tag colors
  const tagColors = ['#F1C40F', '#E74C3C', '#2ECC71', '#3498DB'];

  const createJournalCard = async () => {
    try {
      const formattedDate = `${date.getFullYear()} . ${(date.getMonth() + 1).toString().padStart(2, '0')} . ${date.getDate().toString().padStart(2, '0')}`;
      const title = pageTitle.trim() === '' ? 'New Journal' : pageTitle;
  
      const user = await AsyncStorage.getItem('userId');
      console.log("CREATE_DEBUG_LOG: USER_ID: " + user);
  
      const entryObject = { 
        userId: user,
        date: formattedDate,
        images: [],
        notes: [],
        waterLevel: 0,
        fertilizerLevel: 0,
        page_number: journalCardsData.length + 1,
        subject: tags.tagsArray,
        title: title
      };
  
      const response = await createJournalEntry(entryObject);
      console.log("RESPONSE_PROMISE: ", response);
  
      const newJournalCard = {
        id: response._id, // id for the new card
        date: formattedDate,
        smallImages: [], 
        title: title,
        tags: tags.tagsArray,
        _id: response._id // Assuming response._id contains the MongoDB _id
      };
  
      console.log("CARD_DATA: ", newJournalCard);
  
      // Add to JournalCardData Array
      setJournalCardsData([...journalCardsData, newJournalCard]);
  
      // Close modal and clear inputs
      setCreatePageModalVisible(false);
      setPageTitle('');
      setTags({
        tag: '',
        tagsArray: []
      });
    } catch (error) {
      console.error("Error when creating journal entry: ", error);
    }
  
    //   const user = await AsyncStorage.getItem('userId');
    //   console.log("CREATE_DEBUG_LOG: USER_ID: " + user);

    //   const entryObject = { 
    //     userId: user,
    //     date: formattedDate,
    //     images: [],
    //     notes: [],
    //     waterLevel: 0,
    //     fertilizerLevel: 0,
    //     page_number: journalCardsData.length + 1,
    //     subject: tags.tagsArray,
    //     title: title
    //   };

    //   await createJournalEntry(entryObject)
    //   console.log("RESPONSE_PROMISE: " + response);
    //   const newJournalCard = {
    //     id: journalCardsData.length + 1, // id for the new card
    //     date: formattedDate,
    //     smallImages: [], 
    //     title: title,
    //     tags: tags.tagsArray,
    //     _id: response._id 
    //   };

    //   console.log("CARD_DATA: " + newJournalCard);

    //   // Add to JournalCardData Array
    //   setJournalCardsData([...journalCardsData, newJournalCard]);

    //   // Close modal and clear inputs
    //   setCreatePageModalVisible(false);
    //   setPageTitle('');
    //   setTags({
    //     tag: '',
    //     tagsArray: []
    //   });
    // } catch (error) {
    //   console.log(`Error deleteing plant: ${err}`);
    // }
  };


  // Functions to open and close the createPageModal
  const openCreatePageModal = () => {
    setCreatePageModalVisible(true);
  };
  const closeCreatePageModal = () => {
    setCreatePageModalVisible(false);
  };

  // Date picker
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
  }

  // Dummy data for Journal Task Cards
  const [tasksData, setTasksData] = useState([
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
    },
    {
      id: 3,
      icon: require('../assets/leaf.png'),
      title: "Water",
      description: "Misc",
      smallImage: require('../assets/marigold.jpg')
    }
  ]);

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
  const [journalCardsData, setJournalCardsData] = useState([]);
    // {
    //   id: 1,
    //   date: "2023 . 02 . 13",
    //   nutrientProgress: 0.9,
    //   waterLevelProgress: 0.7,
    //   points: 5,
    //   smallImages: [
    //     require('../assets/marigold.jpg'),
    //     require('../assets/strawberry.jpg'),
    //     require('../assets/lettuce.jpg'),
    //   ],
    //   title: "Title 1 - asdfa",
    //   tags: ["tag1", "tag2", "tag3"],
    // },
    // {
    //   id: 2,
    //   date: "2024 . 04 . 15",
    //   nutrientProgress: 0.4,
    //   waterLevelProgress: 0.6,
    //   points: 2,
    //   smallImages: [
    //     require('../assets/strawberry.jpg'),
    //     require('../assets/lettuce.jpg'),
    //   ],
    //   title: "Title 2 - asdfa",
    //   tags: ["tag1", "tag2", "tag3", "tag3"],
    // },
    // {
    //   id: 3,
    //   date: "2024 . 04 . 15",
    //   nutrientProgress: 0.4,
    //   waterLevelProgress: 0.6,
    //   points: 7,
    //   smallImages: [
    //     require('../assets/strawberry.jpg'),
    //     require('../assets/marigold.jpg'),
    //   ],
    //   title: "Title 3 - asdfa",
    //   tags: ["tag1", "tag2"],
    // }
  //]);
  useEffect(() => {
    const fetchJournalData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                console.error("No user ID found");
                return;
            }
            const data = await getJournal(userId); // Call the function from http.js
            const formattedData = data.map(entry => ({
                id: entry._id,
                date: entry.date.split('T')[0].replace(/-/g, ' . '), // Formatting the date as 'YYYY . MM . DD'
                nutrientProgress: entry.fertilizerLevel / 10, // Assuming 0-10 scales down to 0-1
                waterLevelProgress: entry.waterLevel / 10, // Assuming 0-10 scales down to 0-1
                points: 5, // Example static value, adjust as necessary
                smallImages: entry.images.map(url => ({ uri: url })), // Transform URLs to objects if needed
                title: entry.title,
                tags: entry.subject,
                notes: entry.notes
            }));

            setJournalCardsData(formattedData);
        } catch (error) {
            console.error("Failed to fetch journal data:", error);
        }
    };

    fetchJournalData();
  }, []);
//   const [journalCardsData, setJournalCardsData] = useState([
//     {
//       id: 1,
//       date: "2023 . 02 . 13",
//       nutrientProgress: 0.9,
//       waterLevelProgress: 0.7,
//       points: 5,
//       smallImages: [
//         require('../assets/marigold.jpg'),
//         require('../assets/strawberry.jpg'),
//         require('../assets/lettuce.jpg'),
//       ],
//       title: "Title 1 - asdfa",
//       tags: ["tag1", "tag2", "tag3"],
//     },
//     {
//       id: 2,
//       date: "2024 . 04 . 15",
//       nutrientProgress: 0.4,
//       waterLevelProgress: 0.6,
//       points: 2,
//       smallImages: [
//         require('../assets/strawberry.jpg'),
//         require('../assets/lettuce.jpg'),
//       ],
//       title: "Title 2 - asdfa",
//       tags: ["tag1", "tag2", "tag3", "tag3"],
//     },
//     {
//       id: 3,
//       date: "2024 . 04 . 15",
//       nutrientProgress: 0.4,
//       waterLevelProgress: 0.6,
//       points: 7,
//       smallImages: [
//         require('../assets/strawberry.jpg'),
//         require('../assets/marigold.jpg'),
//       ],
//       title: "Title 3 - asdfa",
//       tags: ["tag1", "tag2"],
//     }
//   ]);

  const handleDeleteJournalCard = (cardId) => {
    const updatedJournalCards = journalCardsData.filter(card => card.id !== cardId);
    setJournalCardsData(updatedJournalCards); 
  };  
  
  const renderJournalCard = ({ item }) => (
    <JournalCard
      date={item.date}
      nutrientProgress={item.nutrientProgress}
      waterLevelProgress={item.waterLevelProgress}
      points={item.points}
      id = {item.id}
      smallImages={item.smallImages}
      title={item.title}
      notes={item.notes ? item.notes : []}
      tags={item.tags ? item.tags : []} // Check if item.tags is defined
      onDelete={() => handleDeleteJournalCard(item.id)}
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
            ListFooterComponent={<View style={{ height: 50 }} />} 
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
              ListFooterComponent={<View style={{ height: 100 }} />} 
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
              <View style={[styles.selectModalContainer, { backgroundColor: theme.gardenBackground, marginBottom: modalMarginBottom }]}>
                
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
                  <TextInput
                    style={[styles.input, {color: theme.text}]}
                    onChangeText={handleTagsChange}
                    value={tags.tag}
                    placeholder="Add up to 4 subjects (comma-separated)"
                    placeholderTextColor="#888" 
                  />
                </View>

                {/* Tags Container */}
                <View style={styles.tagsContainer}>
                  {tags.tagsArray.map((tag, index) => (
                    <View key={index} style={[styles.tagTextContainer, { backgroundColor: tagColors[index % tagColors.length] }]}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
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
  },
  flatListContainer: {
    height: '35%', 
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
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
    marginBottom: 15,
    marginTop: 15,
    height: '35%'
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
    marginBottom: 250,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '49%',
    alignSelf: 'center',
  }, 
  tagTextContainer: {
    overflow: 'hidden',
    backgroundColor: '#1DB954',
    borderRadius: 5,
    width: 80,
    height: 25,
    marginHorizontal: 3,
    marginVertical: 3,
    paddingLeft: 8, 
    paddingTop: 4, 
  },  
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },   
});
