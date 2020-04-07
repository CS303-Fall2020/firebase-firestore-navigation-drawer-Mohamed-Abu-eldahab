import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from 'firebase'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const OnLoginPress = () => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {

            }, (error) => {

                if (email == '' && password == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {

                    if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
                            [{ text: 'DISMISS' }]);
                    } else if (error.message == 'The password is invalid or the user does not have a password.') {
                        Alert.alert('auth/wrong-password', error.message,
                            [{ text: 'DISMISS' }]);
                    } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                        Alert.alert('auth/user-not-found', error.message,
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
                <Text style={styles.header}>Log In</Text>


                <TextInput style={styles.TextInput} placeholder=" write Your email"
                    value={email} onChangeText={(text) => setEmail(text)} underlineColorAndroid={'transparent'} />
                <TextInput style={styles.TextInput} placeholder="Your password"
                    value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button1} onPress={() => OnLoginPress()}>
                    <Text style={styles.btntext}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.btntext}>Forget Password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.btntext1}>if you dont have account ? sign up..</Text>
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
        color: '#fff',
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
        color: '#fff',
        fontWeight: 'bold',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingLeft: 60,
        paddingRight: 60,
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'gray',
        marginTop: 30,
        borderRadius: 10,
    },
    btntext1: {
        color: 'gray',
        fontWeight: 'bold',

    }
});
