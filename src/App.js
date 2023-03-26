import logo from './logo.svg';
import './App.css';
import React from 'react'
import { keyboard } from '@testing-library/user-event/dist/keyboard';

function initBoard(board){
  const pieces = ["r", "n", "b", "q", "k", "b", "n", "r"]
  
  // let moveCallBack = (e) => {
  //   for (let j = 0; j < 8; j++)
  //     for (let i = 0; i < 8; i++)
  //       e.removeEventListener("click", listen)
  // }

  // let listen = (e, piece) => {
  //   e.setAttribute("piece", piece)
  //   moveCallBack(e) 
  // }

  // let move = (piece) => {
  //   for (let j = 0; j < 8; j++){
  //     for (let i = 0; i < 8; i++){
  //       const cases = board.children[8*j+i]
        
  //       cases.addEventListener("click", listen(cases, piece))
  //     }
  //   }
  // }

  for (let i = 0; i < 8; i++){
    board.children[8*1+i].setAttribute("piece", "bp")
    handleMove(board.children[8*1+i])

    //board.children[8*1+i].classList.add("bp")
    board.children[8*0+i].classList.add("b" + pieces[i])
    board.children[8*6+i].classList.add("wp")
    board.children[8*7+i].classList.add("w" + pieces[i])
  }
}

function handleMove(piece){
  piece.addEventListener("click" , startDrag)
  let currentPiece = null;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;

  function startDrag(e) {
  // Stocke la pièce en cours de déplacement et ses coordonnées initiales
  currentPiece = e.target;
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  // Ajoute un événement de souris pour suivre le mouvement de la souris
  document.addEventListener('mousemove', dragPiece);

  // Ajoute un événement de souris pour arrêter le mouvement de la souris
  document.addEventListener('mouseup', stopDrag);
  }

  // Fonction pour faire glisser la pièce
  function dragPiece(e) {
    // Calcule les nouvelles coordonnées de la pièce en fonction du mouvement de la souris
    xOffset = e.clientX - initialX;
    yOffset = e.clientY - initialY;
    currentX = xOffset;
    currentY = yOffset;

    // Déplace la pièce en utilisant les nouvelles coordonnées
    setTranslate(currentX, currentY, currentPiece);
  }

  // Fonction pour arrêter de faire glisser la pièce
  function stopDrag(e) {
    // Supprime les événements de souris utilisés pour suivre le mouvement de la souris
    document.removeEventListener('mousemove', dragPiece);
    document.removeEventListener('mouseup', stopDrag);

    // Trouve le carré de l'échiquier sous la pièce
    const square = document.elementFromPoint(e.clientX, e.clientY);
    console.log(square)
    
    if (square.classList.contains('case')) {
      // Déplace la pièce sur le carré de l'échiquier
      let new_piece = currentPiece.cloneNode()
      square.appendChild(new_piece);
    }

    // Réinitialise les variables de la pièce en cours de déplacement
    currentPiece = null;
    initialX = 0;
    initialY = 0;
    xOffset = 0;
    yOffset = 0;
  }

  // Fonction pour définir la translation CSS d'un élément
  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
}

export function Board(){
  let myRef = React.createRef();
  
  const transformCase = (elm =>  {
    return (elm == 0) ? <div  className="case white" id=""></div> :
    <div className="case black" id="" ></div>
  })
  
  //ro for row odd and re for row even
  const ro = [0, 1, 0, 1, 0, 1, 0, 1].map(transformCase)
  const re = [1, 0, 1, 0, 1, 0, 1, 0].map(transformCase)
  let board = <div id="board" ref={myRef}>
    {[ro, re, ro, re, ro, re, ro, re]}
  </div>
  
  React.useEffect(() => {
    const element = myRef.current;
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
