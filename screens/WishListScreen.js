import {Image, FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import {ref, onValue, remove, orderByChild, equalTo, query, update} from'firebase/database';
import { auth, database } from '../components/firebase-config';
import { useTheme, Card, Button, Title } from 'react-native-paper';

export default function WishListScreen({navigation}){

  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState([]);

  const theme = useTheme();

  const updateList = () => {
    const itemsRef = query(ref(database, 'games/' + auth.currentUser.uid), orderByChild('bought'), equalTo(false));
    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()){
      const data = snapshot.val();
      setItems(Object.values(data));
      setKeys(Object.keys(data));
    }
      else{setItems([])
    }
    });
  }

  const moveToCollection = (index) => {
    let reference = ref(database, 'games/' + auth.currentUser.uid + '/' + keys.splice(index)[0]);
    update(
        reference, {bought: true}
    ).then(() => {
      Alert.alert('Game moved to collection!');
    })
  }

  const deleteItem = (index) => {
    let reference = ref(database, 'games/' + auth.currentUser.uid + '/' + keys.splice(index)[0]);
    remove(
        reference
      ).then(() => {
        Alert.alert('Game deleted!');
        updateList();
      })
  }

  const searchStore = 
  
  useEffect(updateList, []);

  return (
    <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
    
    <Title style={{color:theme.colors.primary}}>WishList: {items.length} game(s)</Title>
    
    <FlatList 
      style={styles.list}
      data={items}
      renderItem={({ item }) =>
        <Card style={styles.cardStyle}>
          <Card.Title title={item.name}></Card.Title>
          <Card.Content>
            <Text
              style={{color:theme.colors.primary, fontWeight:"bold", fontSize:15}}>
                Released: {item.released}
            </Text>
            <Text
              style={{color:theme.colors.primary}}>
                Platform: {item.platform}
            </Text>
            </Card.Content>
            <Card.Cover 
              style={{marginTop:10}}
              source={{uri:item.image}}/>
            
          <Card.Actions>
            <Button
              color={theme.colors.error}
              icon='delete'
              onPress={deleteItem}
              style={styles.button}>
                Delete
            </Button>

            <Button
              color={theme.colors.primary}
              icon='delete'
              onPress={moveToCollection}
              style={styles.button}>
                Add to collection
            </Button>
          </Card.Actions>
        </Card>
        }
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
      padding: 15,
      borderRadius: 10, 
      alignItems: 'center',
    },
  buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
    },
    cardStyle: {
      marginBottom: 10,  
    },
})