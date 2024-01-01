import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import DeleteNoteAlert from '../components/DeleteNoteAlert';

const HomeScreen = ({ navigation }) => {
  const [notesData, setNotesData] = useState([]);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const alertRef = useRef(null);

  const fetchAndSortNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        let parsedNotes = JSON.parse(storedNotes);
        if (sortBy === 'latestToOldest') {
          parsedNotes.sort((a, b) => moment(b.dateTime).valueOf() - moment(a.dateTime).valueOf());
        } else if (sortBy === 'alphabetically') {
          parsedNotes.sort((a, b) => a.title.localeCompare(b.title));
        }
        setNotesData(parsedNotes);
      }
    } catch (error) {
      console.error('Error fetching or sorting notes:', error);
    }
  };

  useFocusEffect(() => {
    refreshNotes();
  });

  const handleEditNote = (id, title, note) => {
    navigation.navigate('EditNoteScreen', {
      noteId: id,
      existingTitle: title,
      existingNote: note,
    });
  };

  const handleDeleteNote = (id) => {
    setDeleteNoteId(id);
    alertRef.current.open();
  };

  const handleConfirmDelete = async () => {
    if (deleteNoteId !== null) {
      try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = [];

        if (existingNotes !== null) {
          notes = JSON.parse(existingNotes);
          const updatedNotes = notes.filter((note) => note.id !== deleteNoteId);
          await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
          refreshNotes();
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      } finally {
        alertRef.current?.close();
      }
    }
  };

  const renderNote = ({ item }) => {
    const truncatedNote = item.note.length > 50 ? `${item.note.substring(0, 25)}...` : item.note;

    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate('ViewNoteScreen', { noteContent: item })}
      >
        <View style={styles.noteHeader}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => handleEditNote(item.id, item.title, item.note)}>
              <Ionicons name="create-outline" size={18} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
              <Ionicons name="trash-outline" size={18} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
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
        <TouchableOpacity onPress={() => setShowSortOptions(!showSortOptions)}>
          <Ionicons name="filter" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {showSortOptions && (
        <View style={styles.sortOptions}>
          <TouchableOpacity onPress={() => handleSort('latestToOldest')}>
            <Text style={[styles.sortOptionText, styles.sortOptionMargin]}>Latest To Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('alphabetically')}>
            <Text style={[styles.sortOptionText, styles.sortOptionMargin]}>Alphabetically</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={notesData}
        renderItem={renderNote}
        keyExtractor={(item) => item.id.toString()}
      />

      <DeleteNoteAlert 
        alertRef={alertRef}
        deleteNoteId={deleteNoteId}
        handleConfirmDelete={handleConfirmDelete}
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
    paddingTop: 30,
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
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
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
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  sortOptions: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    top: 70,
    right: 20,
    elevation: 5,
    borderRadius: 5,
  },
  sortOptions: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    top: 70,
    right: 20,
    elevation: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  sortOptionMargin: {
    margin: 5,
    marginBottom: 5, 
  },

    sortOptionText: {
      fontSize: 17, 
      paddingVertical: 5,
    },
  });

export default HomeScreen;
