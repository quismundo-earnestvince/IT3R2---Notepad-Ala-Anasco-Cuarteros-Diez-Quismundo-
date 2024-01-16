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
  noteDetails: {
  flex: 1,
  justifyContent: 'flex-start',
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
  marginTop: 20,
  marginLeft: 8,
  },
  descriptionInput: {
  height: 490,
  textAlignVertical: 'top',
  fontSize: 17,
  marginLeft: 8,
  },
});

export default ViewNoteScreen;
