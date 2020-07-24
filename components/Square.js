import React, { useState } from 'react'
import { Text, View, StyleSheet, BackHandler } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Square = ({ styles, bomb, total, onClickBomb, id }) => {
    const [checked, setChecked] = useState(false)
    const [gameover, setGameover] = useState(false)
    const onClickNear = () => {
        setChecked(true)
    }
    const onClickMine = () => {
        setGameover(true)
        setChecked(true)
        onClickBomb()
    }
    return (
        bomb ?
            <View  style={
            !gameover ?
                !checked ?
                    { ...style.mine, ...styles }
                    :
                    { ...style.checked, ...styles }
                    :
                    { ...style.gameover, ...styles }
                    }>
                <TouchableOpacity onPress={onClickMine}>
                    <MaterialCommunityIcons name="mine" size={24} color="black" />
                </TouchableOpacity>
            </View>
            :
            <View style={
            !checked ?
                { ...style.nomine, ...styles }
                :
                { ...style.checked, ...styles }
                }>
                <TouchableOpacity onPress={onClickNear}>
                     <Text style={styles.total}>{total}</Text>
                </TouchableOpacity>
            </View>
    )
}
const style = StyleSheet.create({
    mine: {
        borderWidth: 0.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
    },
    nomine: {
        borderWidth: 0.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
    },
    gameover: {
        borderWidth: 0.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        borderWidth: 0.5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',   
    },
    total:{
        fontSize:25
    }
});

export default Square 