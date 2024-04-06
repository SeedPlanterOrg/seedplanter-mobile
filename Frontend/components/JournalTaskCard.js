import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../App';

const JournalTaskCard = ({ icon, title, description, smallImage }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
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
                        <Text style={[styles.taskTimeText, {color: theme.text}]}>2:00 PM</Text>
                    </View>
                </View>
            </View>
        </View>
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
    flex: 1,
  },
  taskTimeText: {
    fontSize: 14, 
    alignSelf: 'center',
  },
});

export default JournalTaskCard;
