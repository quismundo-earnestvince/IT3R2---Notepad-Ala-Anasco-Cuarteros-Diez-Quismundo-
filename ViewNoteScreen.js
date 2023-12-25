
import React from 'react';
import { View, Text } from 'react-native';

const ViewNoteScreen = ({ route }) => {
  const { noteContent } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{noteContent}</Text>
    </View>
  );
};

export default ViewNoteScreen;
