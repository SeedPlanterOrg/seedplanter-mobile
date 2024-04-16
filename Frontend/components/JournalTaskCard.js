import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, Animated } from 'react-native';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const JournalTaskCard = ({ icon, title, description, smallImage }) => {
    const theme = useTheme();
    

    const renderRightActions = (progress, dragAnimatedValue) => {
      const trans = dragAnimatedValue.interpolate({
        inputRange: [-150, 0],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
    
      return (
        <View style={styles.swipedRow}>
          <RectButton style={styles.deleteButton} onPress={() => console.log("Delete pressed")}>
            <Animated.View
              style={{
                transform: [{ translateX: trans }],
              }}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Animated.View>
          </RectButton>
        </View>
      );
    };
    
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderRightActions}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
              <View style={[styles.card, {backgroundColor: theme.gardenCard}]}>
                  <View style={styles.content}>
                      <View style={styles.iconContainer}>
                          <View style={styles.iconBackground}>
                              <Image 
                                  source={icon} 
                                  style={[styles.icon, {tintColor: theme.text}]}
                              />
                          </View>
                      </View>

                      <View>
                          <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
                          <View style={styles.middleContainer}>
                              {smallImage && (
                                  <View style={styles.smallImageContainer}>
                                      <Image 
                                          source={smallImage} 
                                          style={styles.smallImage}
                                      />
                                  </View>
                              )}
                              <Text style={[styles.description, {color: theme.text}]}>{description}</Text>
                          </View>
                      </View>
                      <View style={styles.endContainer}>
                          <Text style={styles.taskTimeText}>2:00 PM</Text>
                      </View>
                  </View>
              </View>
          </View>
        </ThemeProvider>
      </Swipeable>
    </GestureHandlerRootView>
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
  iconContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 15,
  },
  iconBackground: {
    backgroundColor: '#1DB954',
    borderRadius: 15,
    padding: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  content: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  smallImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 25, 
    overflow: 'hidden', 
    marginRight: 10,
  },
  smallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  endContainer: {
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    flex: 1, 
  },
  taskTimeText: {
    alignSelf: 'flex-end', 
    fontSize: 17,
    fontWeight: '500',
    color: "#888",
  },
  swipedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    height: 20, // Adjust the height as needed
    backgroundColor: '#ff0000', // Background color of the swiped row
  },
  deleteButton: {
    backgroundColor: '#ff0000', // Background color of the delete button
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10, // Adjust the margin as needed
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff', // Text color of the delete button
    fontSize: 16,
  },
});

export default JournalTaskCard;
