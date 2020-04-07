import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from "firebase";
export default function ForgetPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const [reset, setReset] = useState(false)
    const OnRetrivePassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setReset(true)

            }, (error) => {
                if (email == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {
                    if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
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
                <Text style={styles.header}>Forget Password</Text>


                <TextInput style={styles.TextInput} placeholder="write Your email"
                    value={email} onChangeText={(text) => setEmail(text)} underlineColorAndroid={'transparent'} />
                {reset ? <Text style={styles.btntext1} > Email was sent successfully. please follow instructions to reset your password.</Text> : console.log()}
                <TouchableOpacity style={styles.button1} onPress={() => OnRetrivePassword()}>
                    <Text style={styles.btntext}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
                    <Text style={styles.btntext}> back to Login </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.btntext}>  back to Signup </Text>
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
        padding: 5,
        backgroundColor: 'gray',
        marginTop: 30,
        borderRadius: 20,
    },
    btntext: {
        color: 'black',
        fontWeight: 'bold',},
        btntext1: {
            color: 'white',
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
        padding: 30,
        backgroundColor: 'red',
        marginTop: 30,
        borderRadius: 20,
    },
    button1: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'gray',
        marginTop: 30,
        borderRadius: 10,
    }
   
});