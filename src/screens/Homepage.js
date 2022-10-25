import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import Card  from "../components"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS, SHADOW } from "../constants"
import Task from './Task';

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding
    },
    textBoxWrapper: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SIZES.padding
    },
    textInput: {
        ...SHADOW,
        borderRadius: SIZES.textBoxRadius,
        backgroundColor: COLORS.secondary,
        height: 60,
        paddingLeft: 15,
        width: "90%",
        color: COLORS.primary,
        marginRight: 15,
        ...FONTS.h2_semiBold,
    },
    btn: {
        ...SHADOW,
        backgroundColor: COLORS.accent,
        height: 45,
        width: 45,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Homepage() {

    //State variables
    //const [list, setList] = useState([])
    const [value, setValue] = useState("")
    let task    = Task
    let resgata = []
    //let Lista = ["qualquer coisa"]
    //CARREGANDO OS DADOS ASYNC STORAGE
    getData

    // A function that add data to the list array
    const addText= async() => {
        //if (value !== "") {
           /* setList(prev => {
                return [
                    ...prev,
                    { text: text, isSelected: false } // Adding a JS Object
                ]
            })*/
            //Lista.push(value)
            //setValue("")
           // console.log(Lista)
        //} else {
           // alert("Descreva a tarefa!")
        //}
        try {
            if(value !== ""){
                task.push(value)
                setValue("")
                console.log(task)
            }
            const jsonValue = JSON.stringify(task)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (error) {
            console.log(error)
        }
    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            resgata = jsonValue != null ? JSON.parse(jsonValue) : null;
            return resgata
        } catch(e) {
        // error reading value
        }
    }
  
    const delet = (Task)=>{
        //console.log(`Delet Task -> ${Task}`)
        if(task.includes(Task)){
            let index = task.indexOf(Task)
            task.splice(index)
            setTimeout(()=>{
                setValue('.')
                setValue('')
            },0)
        }
    }
       
    return <View style={styles.container}>
        <Text style={{ ...FONTS.h1_semiBold, color: COLORS.secondary, marginBottom: 15, marginTop: 35 }}>O que precisa ser feito?</Text>
        <View style={styles.textBoxWrapper}>
            <TextInput style={styles.textInput} value={value} onChangeText={setValue}></TextInput>
            <TouchableOpacity
                style={styles.btn}
                onPress={addText}>

                <Text style={{ fontSize: 40, color: COLORS.secondary  }}>+</Text>
            </TouchableOpacity>
        </View>
        {resgata && resgata.length>0 ? resgata.map(Task => 
            <Text key={Task} onPress={()=> delet(Task)} >{Task}</Text>)
            : 
            <Text>Nenhuma task cadastrada ou resgatada</Text>}
    </View>
}