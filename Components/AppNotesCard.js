import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native';

import colors from '../config/colors';
import AppTextButton from './AppTextButton';

const AppNotesCard = ({
  title,
  subtitle,
  btnText,
  btnPress,
  update,
  noteId,
  onDelete,
}) => {
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState(title);
  return (
    <View underlayColor={colors.white}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {edit ? (
            <TextInput value={note} onChangeText={(txt) => setNote(txt)} />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>

        {edit ? (
          <AppTextButton
            title={'update'}
            onPress={() => {
              console.log('ddd');
              update(noteId, note);
              setEdit(false);
            }}
          />
        ) : (
          btnText && (
            <AppTextButton
              title={btnText}
              onPress={() => {
                setEdit(true);
              }}
            />
          )
        )}
        {onDelete && !edit && (
          <AppTextButton
            style={{paddingLeft: 5}}
            title="Delete"
            onPress={() => {
              onDelete(noteId);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default AppNotesCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    margin: 2,
    marginHorizontal: '10%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 12,
  },
});
