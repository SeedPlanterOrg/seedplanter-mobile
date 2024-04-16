import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useTheme, ThemeProvider } from 'styled-components/native';
import * as Progress from 'react-native-progress';

const JournalCard = ({ date, smallImages, title, tags }) => {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [pageTitle, setPageTitle] = useState(title); 
    const [userNotes, setUserNotes] = useState('');

    const colors = ['#F1C40F', '#E74C3C', '#2ECC71', '#3498DB'];

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handlePageTitleChange = (text) => {
        setPageTitle(text);
    };

    const handleUserNotesChange = (text) => {
        setUserNotes(text);
    };

    return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleModal}>
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
                                <Text style={styles.dateText}>{pageTitle}</Text>
                                <View style={styles.tagsContainer}>
                                    {tags.map((tag, index) => (
                                        <View key={index} style={[styles.tagTextContainer, { backgroundColor: colors[index % colors.length] }]}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                presentationStyle='pageSheet'
                transparent={false}
                visible={modalVisible}
                onRequestClose={toggleModal}>
                <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
                    {/* Create Page */}
                    <View style={[styles.headerContainer, { paddingTop: 15, paddingBottom: 25 }]}>
                        <Text style={[styles.headerText, { color: theme.text }]}>
                            Journal <Text style={styles.greenText}>Page</Text>
                        </Text>
                    </View>

                    {/* Inputs for journal title and subjects */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, {color: theme.text}]}
                            onChangeText={handlePageTitleChange}
                            value={pageTitle}
                            placeholder="Add a journal title"
                            placeholderTextColor="#888" 
                        />
                    </View>

                    <Text style={styles.dateTextModal}>{date}</Text>

                    {/* Display Tags */}
                    <View style={styles.tagsModalContainer}>
                        {tags.map((tag, index) => (
                            <View key={index} style={[styles.tagTextModalContainer, { backgroundColor: colors[index % colors.length] }]}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Notes Container */}
                    <View style={styles.notesContainer}>
                        <Text style={[styles.headerText, { color: theme.text }]}>
                            <Text>Notes</Text>
                        </Text>


                        {/* Notes */}
                        <View>
                            <TextInput
                                style={[styles.inputModal, {color: theme.text}]}
                                onChangeText={handleUserNotesChange}
                                value={userNotes}
                                placeholder="What's on your mind..."
                                placeholderTextColor="#888" 
                                editable
                                multiline
                            />
                        </View>
                    </View>


                    
                </View>
            </Modal>
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
    dateTextModal: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15,
        marginLeft: 15,
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 172,
    }, 
    tagsModalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
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
    tagTextModalContainer: {
        overflow: 'hidden',
        backgroundColor: '#1DB954',
        borderRadius: 5,
        width: 80,
        height: 25,
        marginHorizontal: 5,
        paddingLeft: 8, 
        paddingTop: 4, 
    },    
    tagText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },   
    endContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    modalContent: {
        flex: 1, 
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    greenText: {
        color: '#1DB954',
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
        borderWidth: 0,
        borderRadius: 15,
        fontSize: 25,
    },
    inputModal: {
        borderWidth: 0,
        fontSize: 20,
        width: '100%',
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
    notesContainer: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    
});

export default JournalCard;


