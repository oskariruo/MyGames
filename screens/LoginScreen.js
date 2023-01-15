import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../components/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme, Button } from 'react-native-paper';

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();

    useEffect(() => {
     const unsub =  auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("TabNavi")
            }
        })

        return unsub
    }, [])


    const handleLogIn = () => {
        if (email === '' && password === '') {
            Alert.alert('Please fill the email and the password');
        }
        else {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with ' + user.email);
        })
        .catch(error => alert(error.message))
    }
}
  return (
    <KeyboardAvoidingView
    style={[styles.container, {backgroundColor:theme.colors.background}]}
    behavior="padding">

    <View style={styles.inputContainer}>
    <TextInput
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
    />
    <TextInput
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
    />
    </View>

    <View style={styles.buttonContainer}>
    <Button
        onPress={handleLogIn}
        style={styles.button}>
            Login
    </Button>
    <Button
        onPress={() => {navigation.replace("SignUp")}}
        style={styles.button}>
            Register
    </Button>
    </View>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
})