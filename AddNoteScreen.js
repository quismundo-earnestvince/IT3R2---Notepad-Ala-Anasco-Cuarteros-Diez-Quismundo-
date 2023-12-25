import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNote = ({ navigation }) => {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');

  const insertNote = async () => {
    if (title !== '') {
      const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

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

        Alert.alert('Note Saved!', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('HomeScreen');
            },
          },
        ]);
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Notepad</Text>
      </View>

      <TextInput
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={[styles.input, styles.titleInput]}
      />
      <TextInput
        placeholder="ADD DESCRIPTION..."
        onChangeText={(text) => setNote(text)}
        multiline={true}
        value={note}
        style={[styles.input, styles.descriptionInput]}
      />

      <TouchableOpacity onPress={insertNote} style={styles.button}>
        <Text>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,
    marginBottom: 0,
  },
  titleInput: {
    borderBottomWidth: 2,
    borderColor: 'black',
    fontSize: 20,
  },
  descriptionInput: {
    height: 500,
    textAlignVertical:"top",
    fontSize: 17,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginBottom: 20,
  },
});

export default AddNote;
