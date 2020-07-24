import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { FlatList, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Square from './components/Square'
import Modal from 'react-native-modal';
import { set } from 'react-native-reanimated';

export default function App() {
  let arraylenght = 10
  let bombAmount = 20
  const [squares, setSquares] = useState([])
  const { width, height } = Dimensions.get('window');
  const [gameOverModal, setGameOverModal] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  useEffect(() => {
    const board = createBoard()
    // console.log(board)
    setSquares(board)
  }, [])
  const createBoard = () => {
    const bombsArray = Array(bombAmount).fill({ id: 0, checked: false, bomb: true, total: 0 })
    const emptyArray = Array(arraylenght * arraylenght - bombAmount).fill({ id: 0, checked: false, bomb: false, total: 0 })
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
    let data = []
    for (let i = 0; i < arraylenght * arraylenght; i++) {
      let total = 0
      const isLeftEdge = (i % arraylenght === 0)
      const isRightEdge = (i % arraylenght === arraylenght - 1)
      if (!shuffledArray[i].bomb) {
        if (i > 0 && !isLeftEdge && shuffledArray[i - 1].bomb) total++
        if (i > arraylenght - 1 && !isRightEdge && shuffledArray[i + 1 - arraylenght].bomb) total++
        if (i > arraylenght && shuffledArray[i - arraylenght].bomb) total++
        if (i > arraylenght + 1 && !isLeftEdge && shuffledArray[i - 1 - arraylenght].bomb) total++
        if (i < (arraylenght * arraylenght) - 2 && !isRightEdge && shuffledArray[i + 1].bomb) total++
        if (i < (arraylenght * arraylenght) - arraylenght && !isLeftEdge && shuffledArray[i - 1 + arraylenght].bomb) total++
        if (i < (arraylenght * arraylenght) - arraylenght - 2 && !isRightEdge && shuffledArray[i + 1 + arraylenght].bomb) total++
        if (i < (arraylenght * arraylenght) - arraylenght - 1 && shuffledArray[i + arraylenght].bomb) total++
      }
      const square = {
        id: i,
        checked: false,
        bomb: shuffledArray[i].bomb,
        total: total
      }
      data.push(square)
    }
    return data
  }
  const onGameOver = () => {
    console.log("gameover")
    // setSquares([])
    setGameOverModal(true)
  }
  const renderItem = ({ item, index }) => {
    // console.log(item)
    return (
      <Square
        bomb={item.bomb}
        checked={item.checked}
        total={item.total}
        styles={{ width: width / arraylenght, height: width / arraylenght }}
        id={item.id}
        onClickBomb={() => onGameOver()}
      />
      // <Text>{item.item.key}</Text>
    )
  }
  const onGameOk = () => {
    console.log('game ok')
    setSquares([])
    setGameOverModal(false)
    setIsGameOver(true)
  }
  const onGameRestart = () => {
    console.log('game onGameRestart')
    const board = createBoard()
    setSquares(board)
    setIsGameOver(false)
  }
  return (
    <View style={styles.container}>
      {isGameOver ? <Button title={'RESTART'} color={"#000"} onPress={onGameRestart} /> : <FlatList
        data={squares}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={arraylenght}
      />}

      <StatusBar hidden={true} />
      <Modal isVisible={gameOverModal}>
        <View style={styles.modal}>
          <Text style={styles.gameover}>GAME OVER</Text>
          <Button title={'OK'}  color="#'rgba(0, 0, 0, 0)'" onPress={onGameOk} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restart: {
    backgroundColor: 'white',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameover: {
    color: 'white',
    marginTop: 20,
    fontSize: 30
  },
  gameover2: {
    margin: 50,
    color: 'white',
    // marginTop:20
  }
});
