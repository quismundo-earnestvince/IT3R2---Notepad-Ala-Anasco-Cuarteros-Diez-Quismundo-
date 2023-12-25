import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const AddNote = ({ navigation }) => {
  const dataCategory = [ 
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },

  ];

  const [category_id, setCategoryId] = useState(dataCategory.length > 0 ? dataCategory[0].id : '');
  const [category, setCategory] = useState(dataCategory.length > 0 ? dataCategory[0].name : '');
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');

  const setDefaultCategory = () => {
    if (dataCategory.length > 0) {
      setCategoryId(dataCategory[0].id);
      setCategory(dataCategory[0].name);
    }
  };

  const updateCategory = input => {
    setCategory(input);
    dataCategory.forEach(category => {
      if (category.name === input) {
        setCategoryId(category.id);
      }
    });
  };

  const insertNote = () => {
    if (title !== '' && category !== '') {
    
      console.log({ title, note, category, category_id });

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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={updateCategory}
        >
          {dataCategory.map((categoryItem, key) => (
            <Picker.Item
              key={key}
              label={categoryItem.name}
              value={categoryItem.name}
            />
          ))}
        </Picker>
      </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  }
});

export default AddNote;
