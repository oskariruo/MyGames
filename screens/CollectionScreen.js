import {Image, FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import {ref, onValue, remove, orderByChild, equalTo, query} from'firebase/database';
import { auth, database } from '../components/firebase-config';
import { useTheme, Card, Button, Title, ProgressBar } from 'react-native-paper';

export default function CollectionScreen({navigation}){
  const [level, setLevel] = useState('Beginner');
  const [progress, setProgress] = useState(0)
  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState([]);

  const theme = useTheme();

  const userLevel = () => {
    if (items.length <= 10) {
      setLevel('Beginner');
      let beginner = items.length/10;
      setProgress(beginner);
    }
    else if (items.length > 10 ) {
      setLevel('Novice');
      let novice = (items.length-10) / 40;
      setProgress(novice);
    }
    else if (items.length > 50) {
      setLevel('Hobbyist');
      let hobbyist = (items.length-50) / 50;
      setProgress(hobbyist);
    }
    else if (items.length > 100) {
      setLevel('Expert');
      let expert = (items.length-100) /900;
      setProgress(expert);
    }
    else if (items.length > 1000) {
      setLevel('Wizard');
      setProgress(1);
    }
  }


  const updateList = () => {
    const itemsRef = query(ref(database, 'games/' + auth.currentUser.uid), orderByChild('bought'), equalTo(true));
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

  const deleteItem = (index) => {
    let reference = ref(database, 'games/' + auth.currentUser.uid + '/' + keys.splice(index)[0]);
    remove(
        reference
      ).then(() => {
        Alert.alert('Game deleted!');
        updateList();
      })
    }
  
useEffect(updateList, []);
useEffect(userLevel);


  return (
    <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
     <Title style={{color:theme.colors.primary}}>Game Collection: {items.length} games</Title>
     <Text style={{color:theme.colors.error}}>Your rank is: {level}</Text>
     <ProgressBar progress={progress} color={theme.colors.error} width={200} marginBottom={10}/>
    <FlatList 
        style={styles.list}
        data={items}
        renderItem={({ item }) =>
          <Card style={[styles.cardStyle]}>
            <Card.Title title={item.name}></Card.Title>
            <Card.Content>
              <Title>Released: {item.released}</Title>
              <Text>{item.bought}</Text>
            </Card.Content>
            <Card.Cover 
           style={{marginTop:10}}
          source={{uri: item.image}}/>
            
            <Card.Actions>
            <Button
            color={theme.colors.error}
            icon='delete'
        onPress={deleteItem}
        style={styles.button}>
            Delete
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
      width: '80%',
      padding: 15,
      borderRadius: 10, 
      alignItems: 'center',
      marginTop: 10,
    },
  buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
    },
    cardStyle: {
      marginBottom: 10,
    }
})