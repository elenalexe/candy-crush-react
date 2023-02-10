/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import Header from "./components/Header";
import RJ from './images/RJ.png';
import Koya from './images/koya.png'
import Chimmy from './images/chimmy.png'
import Cooky from './images/cooky.png'
import Mang from './images/mang.png'
import Shooky from './images/shooky.png'
import Tata from './images/tata.png';
import Blank from './images/blank.png'

const width = 8;
const candyColors = [
  Koya,
  Chimmy,
  RJ,
  Mang, 
  Cooky,
  Tata,
  Shooky
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [ squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [ squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [ scoreDisplay, setScoreDisplay ] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 8; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank

      if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(square => currentColorArrangement[square] = Blank)
        return true;
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 8; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArrangement[i] === Blank

      if(notValid.includes(i)) continue;

      if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(square => currentColorArrangement[square] = Blank)
        return true;
      }
    }
  }
  
  const checkForColumnOfThree = () => {
    for (let i = 8; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank

      if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(square => currentColorArrangement[square] = Blank)
        return true;
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 8; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArrangement[i] === Blank

      if(notValid.includes(i)) continue;

      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(square => currentColorArrangement[square] = Blank)
        return true;
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for(let i = 0; i < 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if(isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if((currentColorArrangement[i + width]) === Blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = Blank;
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  }

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId -1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnofFour = checkForColumnOfFour()
    const isARowofFour = checkForRowOfFour()
    const isAColumnofThree = checkForColumnOfThree()
    const isARowfThree = checkForRowOfThree()

    if(squareBeingReplacedId && validMove && ( isARowfThree || isARowofFour || isAColumnofFour || isAColumnofThree)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random()  * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();

      setCurrentColorArrangement([...currentColorArrangement])
    }, 200)

    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, checkForRowOfThree, checkForColumnOfThree, moveIntoSquareBelow, currentColorArrangement])

  return (
    <div className="test">
      <Header/>
        <ScoreBoard score={scoreDisplay} />
      <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id = {index}
            draggable = {true}
            onDragStart = {dragStart}
            onDragOver = {(e) => e.preventDefault()}
            onDragEnter = {(e) => e.preventDefault()}
            onDragLeave = {(e) => e.preventDefault()}
            onDrop = {dragDrop}
            onDragEnd = {dragEnd}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
