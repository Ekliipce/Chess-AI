import logo from './logo.svg';
import './App.css';
import React from 'react'

function initBoard(board){
  const pieces = ["r", "n", "b", "q", "k", "b", "n", "r"]
  
  let move = () => {
    for (let j = 0; j < 8; j++){
      for (let i = 0; i < 8; i++){
        const cases = board.children[8*j+i]
        
        cases.addEventListener("click", () => {
          cases.setAttribute("piece", "bp")
        })
      }
    }
  }

  for (let i = 0; i < 8; i++){
    board.children[8*1+i].setAttribute("piece", "bp")
    board.children[8*1+i].addEventListener("click", move)

    //board.children[8*1+i].classList.add("bp")
    board.children[8*0+i].classList.add("b" + pieces[i])
    board.children[8*6+i].classList.add("wp")
    board.children[8*7+i].classList.add("w" + pieces[i])
  }
}

export function Board(){
  let myRef = React.createRef();
  
  const transformCase = (elm =>  {
    return (elm == 0) ? <div  className="case white" id=""></div> :
    <div className="case black" id=""></div>
  })
  
  //ro for row odd and re for row even
  const ro = [0, 1, 0, 1, 0, 1, 0, 1].map(transformCase)
  const re = [1, 0, 1, 0, 1, 0, 1, 0].map(transformCase)
  let board = <div id="board" ref={myRef}>
    {[ro, re, ro, re, ro, re, ro, re]}
  </div>
  
  React.useEffect(() => {
    const element = myRef.current;
    console.log(element.children[8*1+2]);
    initBoard(element)
  }, []);

  return <div>{board}</div>
  
}

function App() {
  return (
    <div id="App">
      <h1>Hello</h1>
      <Board />
    </div>
  );
}

export default App;
