import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from 'firebase'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const OnSignUp = () => {
        if (password !== passwordConfirm) {
            Alert.alert('Passwords do not match')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

            }, (error) => {

                if (email == '' && password == '' && passwordConfirm == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {
                    if (error.message == 'The email address is already in use by another account.') {
                        Alert.alert('auth/email-already-in-use', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }else if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
                            [{ text: 'DISMISS' }]);
                    } else {
                        Alert.alert('auth/network-request-failed', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }
                }
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
        <View style={styles.container}>
            <View style={styles.register}>
                <Text style={styles.header}>Registration</Text>

                <TextInput style={styles.TextInput} placeholder=" email"
                    value={email} onChangeText={(text) => setEmail(text)} underlineColorAndroid={'transparent'} />
                <TextInput style={styles.TextInput} placeholder=" password"
                    value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <TextInput style={styles.TextInput} placeholder="confirm"
                    value={passwordConfirm} onChangeText={(text) => setPasswordConfirm(text)} secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button1} onPress={() => OnSignUp()}>
                    <Text style={styles.btntext}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.btntext}>Forget Password??</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btntext1}>have an account ? login now </Text>
                </TouchableOpacity>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    register: {
        alignSelf: 'stretch',

    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: 'white',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'gray',
        marginTop: 30,
        borderRadius: 10,
    },
    button1: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'gray',
        marginTop: 30,
        borderRadius: 15,
    },
    btntext: {
        color: 'black',
        fontWeight: 'bold',

    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'grey',
        marginTop: 20,
        borderRadius: 10,
    },
    container: {
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
        flex: 1,
    },
    btntext1: {
        color: 'gray',
        fontWeight: 'bold',

    }
    
});
