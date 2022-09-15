import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../res/globalStyles";

const gameSize = 2;
const numberOfCells = (gameSize + 1) ** 2;

export const Game = ({ navigation }) => {
  const [arr, setArr] = useState([]);
  const [isWin, setIsWin] = useState(false);

  const createGrid = () => {
    let n = 1;
    const result = [];
    for (let i = 0; i < numberOfCells; i++) {
      const cell = { id: n, content: n };
      if (n < numberOfCells) {
        cell.isEmpty = false;
      } else {
        cell.isEmpty = true;
      }
      result.push(cell);
      n++;
    }
    return result;
  };

  const shuffleGrid = array => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const distributePositions = array => {
    const result = [];
    let n = 1;
    for (let i = 0; i <= gameSize; i++) {
      for (let j = 0; j <= gameSize; j++) {
        const cellWithPosition = { ...array[n - 1], position: `cell-${i}-${j}` };
        result.push(cellWithPosition);
        n++;
      }
    }
    return result;
  };

  const shiftCell = cell => {
    if (cell.isEmpty === false) {
      const emptyCell = getEmptyAdjacentCell(cell);
      if (emptyCell) {
        const newArray = [...arr];
        const tempPos = emptyCell.position;
        const cellIdx = newArray.findIndex(el => el.id === cell.id);
        const emptyIdx = newArray.findIndex(el => el.id === emptyCell.id);

        [newArray[cellIdx], newArray[emptyIdx]] = [newArray[emptyIdx], newArray[cellIdx]];
        newArray[cellIdx].position = cell.position;
        newArray[emptyIdx].position = tempPos;

        setArr(newArray);

        setTimeout(checkOrder, 150);
      }
    }
  };

  const getCell = (row, col) => {
    return arr.filter(item => item.position === `cell-${row}-${col}`)[0];
  };

  function getAdjacentCells(cell) {
    const pos = cell.position.split("-");
    const row = parseInt(pos[1]);
    const col = parseInt(pos[2]);

    const adjacent = [];

    // Gets all possible adjacent cells
    if (row < gameSize) {
      adjacent.push(getCell(row + 1, col));
    }
    if (row > 0) {
      adjacent.push(getCell(row - 1, col));
    }
    if (col < gameSize) {
      adjacent.push(getCell(row, col + 1));
    }
    if (col > 0) {
      adjacent.push(getCell(row, col - 1));
    }

    return adjacent;
  }

  function getEmptyAdjacentCell(cell) {
    const adjacent = getAdjacentCells(cell);

    // Searches for empty cell
    for (let i = 0; i < adjacent.length; i++) {
      if (adjacent[i].isEmpty) {
        return adjacent[i];
      }
    }
    return false;
  }

  function checkOrder() {
    if (getCell(gameSize, gameSize).isEmpty === false) {
      return;
    }
    var n = 1;
    for (var i = 0; i <= gameSize; i++) {
      for (var j = 0; j <= gameSize; j++) {
        if (n <= numberOfCells && getCell(i, j).content != n.toString()) {
          return;
        }
        n++;
      }
    }

    alert("Win!");
    setIsWin(true);
  }

  const prepareGrid = () => {
    const grid = createGrid();
    const shuffled = shuffleGrid(grid);
    const withPos = distributePositions(shuffled);
    setArr(withPos);
  };

  useEffect(() => {
    prepareGrid();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Puzzle 15</Text>

      <View style={styles.wrapper}>
        {arr.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, item.isEmpty && styles.item_empty]}
            onPress={() => shiftCell(item)}
          >
            {!item.isEmpty && <Text style={styles.item__text}>{item.content}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.btnsWrapper}>
        {isWin && (
          <TouchableOpacity style={styles.btn} onPress={prepareGrid}>
            <Text style={styles.btn__text}>Start New Game</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btn__text}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  wrapper: {
    marginTop: 50,
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    height: 100,
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  item_empty: {
    backgroundColor: "transparent",
  },
  item__text: {
    fontSize: 48,
  },
  btnsWrapper: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "aliceblue",
    borderRadius: 10,
    marginBottom: 10,
  },
  btn__text: {
    fontSize: 20,
    textAlign: "center",
  },
});
