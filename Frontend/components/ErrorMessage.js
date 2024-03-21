import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    // Add your styles here. For example:
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft : 10
  },
});

export default ErrorMessage;