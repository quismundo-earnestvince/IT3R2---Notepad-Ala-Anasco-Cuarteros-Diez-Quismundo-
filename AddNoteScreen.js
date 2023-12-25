import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
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
        placeholder="ADD TITLE..."
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder="ADD DESCRIPTION..."
        onChangeText={text => setNote(text)}
        multiline={true}
        value={note}
      />
      <TouchableOpacity onPress={insertNote} style={styles.button}>
        <Text>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10
  },
});

export default AddNote;
