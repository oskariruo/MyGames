import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert,} from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { auth, database } from '../components/firebase-config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignupScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const theme = useTheme();

    const saveUser = (user) => {
        database().ref("users/").push(
          {'id': user.uid, 'e-mail': user.email}
        );
    };

    const signup = () => {
        if (email === '' || password === '' )  {
            Alert.alert('Please fill the form properly');
        }
        else if (password !== confirmPassword) {
            Alert.alert("Passwords don't match.")
            return
        }
        else {
            createUserWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                if (auth().currentUser) {
                    saveUser(auth().currentUser)
                }
            })
            .catch((error) => {
                let errorMessage = error.message;
                Alert.alert(errorMessage)
            });
        }
    };
        
    return (
        <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
        
        <Text style={{marginTop:200}}>Register as a new user</Text>
            
        <TextInput
            style={styles.input}
            placeholder='E-mail'
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
    
        <View style ={{flexDirection: 'row'}}>
        
        <Button
            onPress={() => navigation.replace('Login')}>
                Back to login
        </Button>
        <Button
            onPress={() => signup()}>
                Sign up
        </Button>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    input: {
        height: 48,
        width: '80%',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: 'tomato',
        marginLeft: 5,
        marginRight:5,
        marginTop: 20,
        height: 40,
        width: 160,
        borderRadius: 5,
    },
});