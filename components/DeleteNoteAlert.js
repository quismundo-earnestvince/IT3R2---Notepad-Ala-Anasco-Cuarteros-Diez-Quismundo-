import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AlertPro from 'react-native-alert-pro';

const DeleteNoteAlert = ({ alertRef, deleteNoteId, handleConfirmDelete }) => {
  return (
    <AlertPro
      ref={alertRef}
      title="Delete Note"
      message="Are you sure you want to delete this note?"
      onCancel={() => alertRef.current?.close()}
      onConfirm={handleConfirmDelete}
      showConfirm={true}
      textCancel="No"
      textConfirm="Yes"
      customStyles={{
        cancelButton: { color: 'red' },
      }}
    />
  );
};

export default DeleteNoteAlert;
