import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'

export default function Home({ navigation }) {
    const OnSignOut = () => {
        firebase.auth().signOut()

    }
    var user = firebase.auth().currentUser;
    return (


        <View style={styles.container}>
            <View >
                <Text style={styles.header}>Hello</Text>
            </View>
            <Text style={styles.text}> Welcome {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => OnSignOut()}>
                <Text style={styles.btntext}>Sign Out</Text>
            </TouchableOpacity>

        </View>

    )
}
const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'gray',
        marginTop: 30,
        marginRight:20,
        marginLeft:20,
        borderRadius: 20,
    },
    btntext: {
        color: 'black',
        fontWeight: 'bold',

    },
    container: {
        flex: 1,

        backgroundColor: 'black',


        paddingBottom: 30,
    },
    header: {

        height: 80,
        marginBottom: 250,
        padding: 10,
        paddingTop: 38,
        backgroundColor: 'gray',

        fontSize: 22
    },
    text: {
        color: 'white',
        marginLeft:20,
    }
})