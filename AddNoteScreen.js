import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import moment from 'moment';

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
      } catch (error) {
        console.error('Error saving note:', error);
      }

      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10
  },
});

export default AddNote;
