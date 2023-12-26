import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNoteScreen = ({ navigation, route }) => {
  const { noteId, existingTitle, existingNote } = route.params;
  const [note, setNote] = useState(existingNote);
  const [title, setTitle] = useState(existingTitle);

  const updateNote = async () => {
    if (title !== '') {
      const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

      const updatedNote = {
        id: noteId,
        title,
        note,
        dateTime,
      };

      try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = [];

        if (existingNotes !== null) {
          notes = JSON.parse(existingNotes);
          const updatedNotes = notes.map((item) =>
            item.id === noteId ? { ...item, title, note, dateTime } : item
          );
          await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

          Alert.alert('Note Updated!', '', [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Edit Note</Text>
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

      <TouchableOpacity onPress={updateNote} style={styles.button}>
        <Text>Update Note</Text>
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

export default EditNoteScreen;
