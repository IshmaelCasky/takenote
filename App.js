import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, TextInput , ScrollView, KeyboardAvoidingView} from 'react-native';
import { 
  FredokaOne_400Regular 
} from '@expo-google-fonts/fredoka-one';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NoteLists } from './NoteComponents/NoteLists';
import { customAlphabet } from 'nanoid';

export default function App() {

  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  let [fontsloaded] = useFonts({
    FredokaOne_400Regular
  });

  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

  useEffect(() => {

		async function getValueFor(key) {
      const res = await SecureStore.getItemAsync(key);
      const _notes = JSON.parse(res);
      if (_notes) setNotes(_notes);
    }
    getValueFor('react-notes-app-data')
	}, []);

	useEffect(() => {

    async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }

    save('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);


  const addNote = (text) => {
		const newNote = {
			id: nanoid,
			text: text,
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

  const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const handleNote = (e) => {
		if(input !== '') {
			addNote(input);
			setInput('');
		}
	};

  if(!fontsloaded){
    return <AppLoading/>
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.AppLogo}>Take<Text style={styles.textdesign2}>Note</Text></Text>
          <Text style={styles.header}>Current Notes</Text>
          <ScrollView style={styles.tasksContainer}>
            <NoteLists notes={notes} handleDeleteNote={deleteNote}/>
          </ScrollView>
          <View style={styles.createNote}>
            <TextInput style={styles.textInputDesign} value={input} onChangeText={text => setInput(text)} placeholder='Create Note' maxLength={40}/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <TouchableOpacity onPress={handleNote} style={styles.buttonDesign1}>
                <Text style={styles.buttonDesign2}>+</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonDesign1: {
    borderRadius: 50,
    backgroundColor: '#bdbcbc',
    textAlign: 'center',
    width: 55,
    height: 55,
  },

  buttonDesign2: {
    textAlign: 'center',
    marginTop: 15,
  },

  textInputDesign: {
    backgroundColor: "#bdbcbc",
    width: "75%",
    height: 55,
    borderRadius: 50,
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: '#32353B',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  headerContainer: {
    flex: 1,
    flexDirection: "column",
    height: 100,
    width: "100%",
  },

  createNote: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row"
  },
  textdesign: {
    color: "#bdbcbc",
  },
  textdesign2: {
    color: "#dbdb01"
  },
  header: {
    color: "#bdbcbc",
    fontFamily: 'FredokaOne_400Regular',
    marginLeft: 30,
    marginTop: 10,
    fontSize: 15
  },
  tasksContainer: {
    height: 250,
    flexDirection: "column",
    overflow: "hidden",
    marginTop: 50
  },
  AppLogo: {
    fontFamily: 'FredokaOne_400Regular',
    marginTop: 60,
    marginLeft: 20,
    fontSize: 20,
    color: "#bdbcbc"
  }
});
