import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { View } from 'react-native';

export const Note = ({id, text, handleDeleteNote}) => {
  return (
    <View style={styles.note}>
       <TouchableOpacity style={styles.note} onPress={() => handleDeleteNote(id)}>
        <Text style={styles.textdesign}>{text}</Text>
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    note: {
        backgroundColor: "#bdbcbc",
        marginTop: 15,
        marginBottom: 15,
        width: 325,
        height: 35,
        borderRadius: 5
    },
    textdesign: {
      marginLeft: 5,
      fontFamily: "FredokaOne_400Regular",
      color: "#32353B"
    }
});
