import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ViewNoteScreen = ({ route, navigation }) => {

  const { noteContent } = route.params;

  const { title, note } = noteContent;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Note Details</Text>
      </View>

      <View style={styles.noteDetails}>
        <Text style={[styles.input, styles.titleInput]}>{title}</Text>
        <Text style={[styles.input, styles.descriptionInput]}>{note}</Text>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionInput: {
    textAlignVertical: 'top',
    fontSize: 17,
  },
  noteDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default ViewNoteScreen;
