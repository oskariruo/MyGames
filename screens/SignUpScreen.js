import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert,} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth, database } from '../components/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignupScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //save user to the DB
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
            createUserWithEmailAndPassword(email, password)
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
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
                    buttonStyle={{...styles.button,...{backgroundColor: 'gray'}}}
                    onPress={() => navigation.navigate('Sign In')}
                    title="BACK TO LOG IN" 
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={() => signup()}
                    title="SIGN UP" 
                />
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
        backgroundColor: 'white',
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