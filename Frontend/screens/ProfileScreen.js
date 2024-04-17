import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function ProfileScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addModalVisible2, setAddModalVisible2] = useState(false);
  const [addModalVisible3, setAddModalVisible3] = useState(false);
  const [addModalVisible4, setAddModalVisible4] = useState(false);
  {/* Users Current Email */ }
  const [currentEmail, setCurrentEmail] = useState(null);
  {/* Users New Email */ }
  const [newEmail, setNewEmail] = useState(null);
  {/* Users New Email Confirmation */ }
  const [confirmNewEmail, setConfirmNewEmail] = useState(null);

  {/* Users Current Password */ }
  const [confirmPassword, setConfirmPassword] = useState(null);
  {/* Users New Password */ }
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);

  const handleLogout = async () => {
    // Clear the user's credentials
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('gardenId');

    console.log("Logged out!", AsyncStorage.getAllKeys());

    // Navigate back to the login screen
    navigation.navigate('Login');
  };

  const openAboutModal = () => {
    setAddModalVisible(true);
  };
  const closeAboutModal = () => {
    setAddModalVisible(false);
  };

  const openHelpModal = () => {
    setAddModalVisible2(true);
  };
  const closeHelpModal = () => {
    setAddModalVisible2(false);
  };

  const openEmailModal = () => {
    setAddModalVisible3(true);
  };
  const closeEmailModal = () => {
    setAddModalVisible3(false);
  };

  const openPasswordModal = () => {
    setAddModalVisible4(true);
  };
  const closePasswordModal = () => {
    setAddModalVisible4(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.gardenBackground }}>
      <View style={styles.container}>
        {/* {errorMessage && <Text style={styles.error}>{errorMessage}</Text>} */}

        <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
          <TouchableOpacity style={styles.card3}>
            <Image style={styles.ImgSize} source={require('../assets/LogoActiveGreen.png')}></Image>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.conCounter, { borderColor: theme.catBorderColor }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[styles.textSty2, { color: theme.text }]}>0</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={[styles.textSty]}>Plant Count</Text>
              </View>
            </View>
          </View>
          <View style={[styles.conCounter, { borderColor: theme.catBorderColor }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[styles.textSty2, { color: theme.text }]}>0</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={[styles.textSty]}>Journal Count</Text>
              </View>
            </View>
          </View>
          <View style={[styles.conCounter, { borderColor: theme.catBorderColor }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[styles.textSty2, { color: theme.text }]}>0</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={[styles.textSty]}>Highest Streak</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ borderWidth: 0.7, borderColor: theme.text, margin: 40, }} />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity style={[styles.logOutButton, { borderColor: theme.catBorderColor }]}>
            <Text style={[styles.textSty2, { color: theme.text }]}>Name</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity onPress={openEmailModal} style={[styles.logOutButton, { borderColor: theme.catBorderColor }]}>
            <Text style={[styles.textSty2, { color: theme.text }]}>Email</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
          <TouchableOpacity onPress={openPasswordModal} style={[styles.logOutButton, { borderColor: theme.catBorderColor }]}>
            <Text style={[styles.textSty2, { color: theme.text }]}>Password</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity onPress={openAboutModal} style={[styles.logOutButton, { borderColor: theme.catBorderColor }]}>
            <Text style={[styles.textSty2, { color: theme.text }]}>About</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity onPress={openHelpModal} style={[styles.logOutButton, { borderColor: theme.catBorderColor }]}>
            <Text style={[styles.textSty2, { color: theme.text }]}>Help</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <TouchableOpacity title="Logout" onPress={handleLogout} style={[styles.logOutButton2,]}>
            <Text style={[styles.textSty2, { color: '#fff' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* aboutModal */}
      <Modal
        animationType="slide"
        presentationStyle='pageSheet'
        transparent={false}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}>

        <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
          {/* Backbutton */}
          <View style={[styles.Backbutton, { backgroundColor: theme.navbar }]}>
            <Button title="Close" color={theme.text} onPress={closeAboutModal}></Button>
          </View>
          <View style={[styles.imageContainer, { backgroundColor: theme.aboutBack }]}>
            <Image source={require('../assets/LogoActiveGreen.png')} style={styles.ImgSize2} alt="logo" />
          </View>
          <View>
            <Text style={[styles.RightText, { color: theme.text }]}>ABOUT US</Text>
          </View>
          <View style={{ borderWidth: 0.7, borderColor: theme.text, marginTop: 20, marginLeft: 30, marginRight: 30, }} />


        </View>
      </Modal>

      {/* helpModal */}
      <Modal
        animationType="slide"
        presentationStyle='pageSheet'
        transparent={false}
        visible={addModalVisible2}
        onRequestClose={() => setAddModalVisible2(false)}>

        <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
          {/* Backbutton */}
          <View style={[styles.Backbutton, { backgroundColor: theme.navbar }]}>
            <Button title="Close" color={theme.text} onPress={closeHelpModal}></Button>
          </View>
          <View style={[styles.imageContainer2, { backgroundColor: theme.aboutBack }]}>
            <Entypo name="help" size={150} style={[{ marginBottom: 20, marginTop: 20, }, { color: theme.navbar }]} />
          </View>
          <View>
            <Text style={[styles.RightText, { color: theme.text }]}>HELP</Text>
          </View>
          <View style={{ borderWidth: 0.7, borderColor: theme.text, marginTop: 20, marginLeft: 30, marginRight: 30, }} />


        </View>
      </Modal>

      {/* emailModal */}
      <Modal
        animationType="slide"
        presentationStyle='pageSheet'
        transparent={false}
        visible={addModalVisible3}
        onRequestClose={() => setAddModalVisible3(false)}>

        <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
          {/* Backbutton */}
          <View style={[styles.Backbutton, { backgroundColor: theme.navbar }]}>
            <Button title="Close" color={theme.text} onPress={closeEmailModal}></Button>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={[styles.titleLabel, { color: theme.text }]}>Change Email</Text>
          </View>
          <View style={[styles.form]}>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Current Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                placeholder="example@example.com"
                placeholderTextColor="#6b7280"
                value={currentEmail}
                onChangeText={text => setCurrentEmail(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>New Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                placeholder="example@example.com"
                placeholderTextColor="#6b7280"
                value={newEmail}
                onChangeText={text => setNewEmail(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Confirm New Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                placeholder="example@example.com"
                placeholderTextColor="#6b7280"
                value={confirmNewEmail}
                onChangeText={text => setConfirmNewEmail(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Enter Password</Text>
              <TextInput
                secureTextEntry
                placeholder="**********"
                placeholderTextColor="#6b7280"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
            </View>
            <TouchableOpacity>
              <View style={styles.loginButton}>
                <Text style={styles.buttonTxt}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* passwordModal */}
      <Modal
        animationType="slide"
        presentationStyle='pageSheet'
        transparent={false}
        visible={addModalVisible4}
        onRequestClose={() => setAddModalVisible4(false)}>

        <View style={[styles.modalContent, { backgroundColor: theme.gardenBackground }]}>
          {/* Backbutton */}
          <View style={[styles.Backbutton, { backgroundColor: theme.navbar }]}>
            <Button title="Close" color={theme.text} onPress={closePasswordModal}></Button>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={[styles.titleLabel, { color: theme.text }]}>Change Password</Text>
          </View>
          <View style={[styles.form]}>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                placeholder="example@example.com"
                placeholderTextColor="#6b7280"
                value={currentEmail}
                onChangeText={text => setCurrentEmail(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Current Password</Text>
              <TextInput
                secureTextEntry
                placeholder="**********"
                placeholderTextColor="#6b7280"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>New Password</Text>
              <TextInput
                secureTextEntry
                placeholder="**********"
                placeholderTextColor="#6b7280"
                style={[styles.inputControls, { borderColor: theme.catBorderColor, color: theme.text }]}
                value={confirmNewPassword}
                onChangeText={text => setConfirmNewPassword(text)}
              />
            </View>
            <TouchableOpacity>
              <View style={styles.loginButton}>
                <Text style={styles.buttonTxt}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  conCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    width: 100,
    height: 70,
    borderRadius: 20,
  },
  ImgSize: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  ImgSize2: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: -25,
    borderBottomRightRadius: 20,
  },
  imageContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: -25,
    borderBottomRightRadius: 20,
  },
  textSty: {
    fontSize: 10,
    color: '#707070',
  },
  textSty2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  logOutButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    borderWidth: 1.5,
  },
  logOutButton2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: '#f52222'
  },
  card3: {
    borderRadius: 100,
    elevation: 3,
    backgroundColor: 'transparent',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: "#1DB954",
    borderWidth: 3
  },
  ModalContainer: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
  },
  Backbutton: {
    alignItems: 'left',
    padding: 10,
  },
  selectModalContainer: {
    backgroundColor: '#fff',
    height: 270,
    width: 270,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  RightText: {
    justifyContent: 'center',
    fontSize: 40,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  titleLabel: {
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  inputControls: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
  },
  form: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#61b450',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#61b450',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
