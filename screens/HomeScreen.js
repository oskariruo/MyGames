import {push, ref, onValue, remove } from'firebase/database';
import { StyleSheet, TextInput, View, Image, Alert } from 'react-native';
import {Button, Modal, IconButton, Text, useTheme } from 'react-native-paper';
import React, {useState} from 'react';
import {REACT_APP_API_KEY} from '@env'
import {Picker} from "@react-native-picker/picker";
import { auth } from '../components/firebase-config';
import { database } from '../components/firebase-config';

export default function HomeScreen({navigation}){
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult]= useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [bought, setBought] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [released, setRelease] = useState('');

  const theme = useTheme();

  const doSomething = () => {
    searchGame();
    setModalVisible(true);
  }
  const searchGame = () => {

      let slug = search.split(' ').join('-').toLowerCase()
      setSearchResult([])
      fetch(`https://rawg.io/api/games/${slug}?key=${REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then(data => {
        setSearchResult(data)
        setPlatform(data.parent_platform.map(platform.name))
        console.log(plaftom)
        setName(data.name)
        setImage(data.background_image)
        setRelease(data.released)
      })
    }
  
  const saveGame = () => {
    setBought(true);
    push(
      ref(database, 'games/' + auth.currentUser.uid),
      { 'name': name, 'image': image, 'released': released, 'bought': bought})
      .then(() => {
        Alert.alert('Game added!');
        
      })
  }

  return (
    <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
      <Image 
      style={{width: 200, height:200, margin: 10}}
      source={{uri:'https://www.clipartmax.com/png/small/95-953982_gamepad-free-icon-video-games-control-logo.png'}}/>
    <TextInput
            placeholder='Search'
            value={search}
            onChangeText={text => setSearch(text)}
            style={styles.input}
        />

        <Button
        icon='magnify'
        onPress={doSomething}
        style={styles.button}>
            Search
        </Button>

        <Modal
        contentContainerStyle={[styles.modalContent, theme.colors.background]}
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <IconButton
        icon='close'
        size={30}
        onPress={() => setModalVisible(!modalVisible)}/>
          <Image 
          style={{width: 200, height:200, margin: 10}} 
          source={{uri:searchResult.background_image}}/>
          <Text>{searchResult.name}</Text>
          <Text>{searchResult.released}</Text>
          <Text style={{width: '80%', marginTop:20}} numberOfLines={4}>{searchResult.description_raw}</Text>

          <Button
          style={styles.button}
          onPress={saveGame}>
            Add to collection
          </Button>
          <Button
          
          onPress={() => console.log(platforms)}>
            Print
          </Button>
          
        
        </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius: 10,
    marginTop: 5,
},
  button: {
      width: '60%',
      alignItems: 'center',
      marginTop: 40,
    },
  buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
    },
    modalContent: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalButton:{
      backgroundColor: 'pink',
      padding: 15,
      width: '15%',
      marginBottom: 40,
    },
})