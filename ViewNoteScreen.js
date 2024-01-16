import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const ViewNoteScreen = ({ route, navigation }) => {
  const { noteContent } = route.params;
  const { title, note, dateTime } = noteContent;
  const wordCount = note.trim().split(/\s+/).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Go Back</Text>
      </View>

      <Text style={[styles.titleInput]}>{title}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.dateText}>{dateTime}</Text>
          <Text style={styles.wordCountText}>{wordCount} words</Text>
        </View>
      </View>
      
      <Text style={[styles.input, styles.descriptionInput]}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 10,
  justifyContent: 'space-between',
  backgroundColor: '#FAF8F2',
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 5,
  marginTop: 40,
  },
  backButton: {
  position: 'absolute',
  left: 10,
  },
  titleText: {
  fontSize: 18,
  marginLeft: 40,
  },
  infoContainer: {
  alignItems: 'flex-start',
  marginBottom: 10,
  marginLeft: 18,
  },
  infoTextContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  dateText: {
  fontSize: 12,
  color: 'grey',
  marginRight: 10,
  },
  wordCountText: {
  fontSize: 12,
  color: 'grey',
  },

  titleInput: {
    borderBottomWidth: 0,
    borderColor: 'blue',
    fontSize: 30,
    marginTop:0,
    marginLeft:8,
    padding:10,
    // fontWeight: 'bold'
  },
  descriptionInput: {
  height: 550,
  textAlignVertical: 'top',
  fontSize: 17,
  marginLeft: 8,
  paddingLeft:10,
  },
});

export default ViewNoteScreen;
