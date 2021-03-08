import React, { useEffect, useState } from 'react';
import './App.css';
import ReactWordcloud from "react-wordcloud";
import firebase from "./firebase";

function App() {
  const [words, setWords] = useState([]);
  const options = {
    enableTooltip: false,
    fontFamily: "impact",
    fontSizes: [30, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    rotationAngles: [0],
    rotations: 0,
    scale: "rectangular",
    transitionDuration: 2000
  };

  useEffect(() => {
    firebase.getWords().then(res => {
      setWords(res.words.map((word, idx) => {
        if (word.value) {
          return word
        } else {
          return {
            text: word,
            value: Math.floor(Math.random() * 300)
          }
        }
      }))
    })
  }, [])
  return (
    <div className="App">
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}

export default App;