import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNote = ({ navigation }) => {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);

  const insertNote = async () => {
    if (title !== '') {
      const dateTime = moment().format('MMMM DD, YYYY h:mm A ddd');

      const newNote = {
        id: dateTime,
        title,
        note,
        dateTime,
      };

      try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = [];

        if (existingNotes !== null) {
          notes = JSON.parse(existingNotes);
        }

        notes.push(newNote);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));

        setAlertVisible(true); // Show the CustomAlert on successful note addition
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Go Back</Text>
      </View>

      <TextInput
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={[styles.input, styles.titleInput]} // Apply titleInput style here
      />

      <View style={styles.infoContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.dateText}>{moment().format('MMMM DD, YYYY h:mm A')}</Text>
          <Text style={styles.wordCountText}> {note.trim() === '' ? '0 words' : `${note.trim().split(/\s+/).length} words`}</Text>
        </View>
      </View>

      <TextInput
        placeholder="Add Description..."
        onChangeText={(text) => setNote(text)}
        multiline={true}
        value={note}
        style={[styles.input, styles.descriptionInput]}
      />

      <TouchableOpacity onPress={insertNote} style={styles.button}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={isAlertVisible}
        closeAlert={() => {
          setAlertVisible(false);
          setTimeout(() => {
            navigation.goBack();
          }, 500); // Adjust the delay timing as needed
        }}
        messageType="added" 
      />

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
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  input: {
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,
    marginBottom: 0,
  },
  titleInput: {
    borderBottomWidth: 0,
    borderColor: 'blue',
    fontSize: 30,
    marginTop:20,
    marginLeft:8,
    fontWeight: 'bold'
  },
  descriptionInput: {
    height: 490,
    textAlignVertical: 'top',
    fontSize: 17,
    marginLeft:8,
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
  button: {
    alignItems: 'center',
    backgroundColor: '#E9B824',
    padding: 15,
    marginBottom: 20,
    width: 230,
    alignSelf: 'center', // Center the button horizontally
    borderRadius: 50, // Adjust the value to modify the curve amount
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNote;
