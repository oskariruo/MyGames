import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../components/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from 'react-native-paper';

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
        <TouchableOpacity
        onPress={handleLogIn}
        style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {navigation.replace("SignUp")}}
        style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
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
        backgroundColor: 'purple',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'purple',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: 'purple',
        fontWeight: '700',
        fontSize: 16,
    },
})