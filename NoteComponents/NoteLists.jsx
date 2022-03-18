import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Note } from './Note'

export const NoteLists = ({notes, handleDeleteNote}) => {
  return (
    <View style={styles.note}>
        {notes.map(note => <Note id={note.id} text={note.text} handleDeleteNote={handleDeleteNote} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  note: {
      alignItems: "center"
  }
});
