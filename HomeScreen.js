
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AddNoteScreen from './AddNoteScreen';


const HomeScreen = ({ navigation }) => {

  const notesData = [
    { id: 1, title: 'Note 1', content: 'This is the content of Note 1' },
    { id: 2, title: 'Note 2', content: 'This is the content of Note 2' },
    // Add more notes as needed...
  ];


  const renderNote = ({ item }) => (
    <TouchableOpacity style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
    </TouchableOpacity>
  );

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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
