import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [notesData, setNotesData] = useState([]);

  const fetchNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotesData(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const refreshNotes = async () => {
    await fetchNotes();
  };

  useFocusEffect(() => {
    refreshNotes();
  });

  const renderNote = ({ item }) => {
    const truncatedNote = item.note.length > 50 ? `${item.note.substring(0, 25)}...` : item.note;

    return (
      <TouchableOpacity style={styles.noteCard}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteContent}>{truncatedNote}</Text>
        <Text style={styles.noteDateTime}>{moment(item.dateTime).format('MMM DD, YYYY')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Ionicons name="person-circle-outline" size={30} color="black" />
        <Text style={styles.titleText}>Notepad</Text>
        <Ionicons name="filter" size={30} color="black" />
      </View>

      <FlatList
        data={notesData}
        renderItem={renderNote}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNoteScreen')}
      >
        <Ionicons name="add-circle-outline" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 16,
    marginTop: 5,
  },
  noteDateTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
