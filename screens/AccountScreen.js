import { StyleSheet, View } from 'react-native';
import React from 'react';
import { auth } from '../components/firebase-config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Button, useTheme, Text } from 'react-native-paper';

export default function AccountScreen({navigation}){

  const theme = useTheme();

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  const resetPassword = () => {
    sendPasswordResetEmail(getAuth, email)
  }

  return (
    <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
      <Text>Logged in as user: {auth.currentUser.email}</Text>
      <Button
      style={styles.button}
      onPress={handleSignOut}
    >
    Change password
    </Button>
    <Button
      style={styles.button}
      onPress={handleSignOut}
    >
    Sign out
    </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
      width: '60%',
      padding: 1,
      borderRadius: 10, 
      alignItems: 'center',
      marginTop: 10,
    },
  buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
    },
})