import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppButton from '../../Components/AppButton';
import AppNotesCard from '../../Components/AppNotesCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default function CreateNotes() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState();
  const [updateNote, setUpdateNote] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    try {
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      firestore()
        .collection('store')
        .doc(store.storeId)
        .collection('notes')
        .onSnapshot((snapshot) => {
          var notes = [];
          snapshot.forEach((each) => {
            notes.push({...each.data(), noteId: each.ref.id});
          });
          setNotes(notes);
        });
    } catch (e) {
      console.log(e, 'err');
    }
  };
  const createNotes = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    note &&
      firestore()
        .collection('store')
        .doc(store.storeId)
        .collection('notes')
        .add({note})
        .then((res) => {
          setNote('');
          console.log('added note');
        });
  };
  const update = async (noteId, note) => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('notes')
      .doc(noteId)
      .update({note})
      .then((res) => {
        console.log('note updated Successfully');
      })
      .catch((e) => {
        console.log('err', e);
      });
  };

  const deleteNote = async (noteId) => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('notes')
      .doc(noteId)
      .delete()
      .then(() => console.log('Note Deleted Successfully'))
      .catch((e) => console.log(e));
  };

  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <Text style={styles.title}>Write Note</Text>
        <TextInput
          multiline
          value={note}
          onChangeText={(text) => setNote(text)}
          style={styles.textInput}
          numberOfLines={10}
          style={{
            backgroundColor: colors.medium,
            textAlignVertical: 'top',
            flexWrap: 'wrap',
          }}
        />
        <AppButton onPress={createNotes} style={styles.btn} title="CREATE" />
        <Text style={styles.title}>Created Notes</Text>
        {notes.length ? (
          notes.map((e, i) => {
            return (
              <AppNotesCard
                noteId={e.noteId}
                update={update}
                onDelete={deleteNote}
                key={i}
                title={e.note}
                btnText="Edit"
              />
            );
          })
        ) : (
          <View style={styles.noOrderView}>
            <Text style={styles.noOrderText}>No Notes Right Now!</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  textInput: {
    borderRadius: 10,
  },
  btn: {
    padding: 15,
    alignSelf: 'center',
    width: 100,
    marginVertical: 10,
  },
  noOrderText: {
    textAlign: 'center',
  },
  noOrderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: 100,
  },
});
