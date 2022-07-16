import './App.css';
import React, { useState } from 'react';
import { Tablero } from './componentes/tablero.jsx';
import { Titulo } from './componentes/titulo.jsx';

//Declaramos las variables globales para la condición de victoria

let countX1user = 0, countX2user = 0, countX3user = 0, countY1user = 0, countY2user = 0, countY3user = 0, countXYuser = 0, countYXuser = 0;
let countX1mach = 0, countX2mach = 0, countX3mach = 0, countY1mach = 0, countY2mach = 0, countY3mach = 0, countXYmach = 0, countYXmach = 0;
let endMatch = false;

export function App() {
  const [casillas, setCasillas] = useState([
    {index: 0, isEmpty: true, isUser: false, coordinateX: 1, coordinateY: 1},
    {index: 1, isEmpty: true, isUser: false, coordinateX: 1, coordinateY: 2},
    {index: 2, isEmpty: true, isUser: false, coordinateX: 1, coordinateY: 3},
    {index: 3, isEmpty: true, isUser: false, coordinateX: 2, coordinateY: 1},
    {index: 4, isEmpty: true, isUser: false, coordinateX: 2, coordinateY: 2},
    {index: 5, isEmpty: true, isUser: false, coordinateX: 2, coordinateY: 3},
    {index: 6, isEmpty: true, isUser: false, coordinateX: 3, coordinateY: 1},
    {index: 7, isEmpty: true, isUser: false, coordinateX: 3, coordinateY: 2},
    {index: 8, isEmpty: true, isUser: false, coordinateX: 3, coordinateY: 3}
  ]);

  // Definimos la función que comprueba si se ha acabado el juego y quién ha ganado

  const handleWin = (listItem) => {

    let coordinateX = listItem.coordinateX;
    let coordinateY = listItem.coordinateY;

    if (listItem.isUser) {
      if ((coordinateX === 1) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX1user += 1;
      } else if ((coordinateX === 2) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX2user += 1;
      } else if ((coordinateX === 3) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX3user +=1;
      }
      if ((coordinateY === 1) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY1user += 1;
      } else if ((coordinateY === 2) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY2user += 1;
      } else if ((coordinateY === 3) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY3user +=1;
      }
      if (coordinateX === coordinateY) {
        countXYuser += 1;
      }
      if ((coordinateX === 1 && coordinateY === 3) || (coordinateX === 2 && coordinateY === 2) || (coordinateX === 3 && coordinateY === 1)) {
        countYXuser += 1;
      }
    } else {
      if ((coordinateX === 1) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX1mach += 1;
      } else if ((coordinateX === 2) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX2mach += 1;
      } else if ((coordinateX === 3) && ((coordinateY === 1) || (coordinateY === 2) || (coordinateY === 3))) {
        countX3mach +=1;
      }
      if ((coordinateY === 1) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY1mach += 1;
      } else if ((coordinateY === 2) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY2mach += 1;
      } else if ((coordinateY === 3) && ((coordinateX === 1) || (coordinateX === 2) || (coordinateX === 3))) {
        countY3mach +=1;
      }
      if (coordinateX === coordinateY) {
        countXYmach += 1;
      }
      if ((coordinateX === 1 && coordinateY === 3) || (coordinateX === 2 && coordinateY === 2) || (coordinateX === 3 && coordinateY === 1)) {
        countYXmach += 1;
      }
    }
    if (countX1mach === 3 || countX2mach === 3 || countX3mach === 3 || countY1mach === 3 || countY2mach === 3 || countY3mach === 3 || countXYmach === 3 || countYXmach === 3) {
      endMatch = true;
      document.getElementById('title').innerHTML = 'Looser!';
      document.getElementById('title').style.top = '2%';
      return endMatch;
    } else if (countX1user === 3 || countX2user === 3 || countX3user === 3 || countY1user === 3 || countY2user === 3 || countY3user === 3 || countXYuser === 3 || countYXuser === 3) {
      endMatch = true;
      document.getElementById('title').innerHTML = 'You win!';
      document.getElementById('title').style.top = '2%';
      return endMatch;
    }
  }

  // Definimos la función que pinta nuestra X y actualiza el array inicial

  const handleStatus = (index) => {
    if (endMatch === false) {
      const newList = [...casillas];
      const listItem = newList.find((listItem) => listItem.index === index);

      if (listItem.isEmpty === true) {
        listItem.isEmpty = false;
        listItem.isUser = true;
        handleWin(listItem);
        setCasillas(newList);
      }
      setTimeout(machineTurn, 1500);
    }
  }

  // Definimos la función que printa el O de la máquina

  const styleMachine = (random, machineO) => {
    machineO[random].style.display = 'block';
    machineO[random].style.color = 'rgb(108, 114, 203)';
  }

  // Definimos la función que ejecuta el turno de la máquina

  const machineTurn = () => {
    
    // Definimos las variables de las clases
    const machineO = document.querySelectorAll('.O');

    if(endMatch === false) {
      const titleVar = document.getElementById('title');
      let filterArray = casillas.filter((element) => element.isEmpty === true);
      if (filterArray.length > 0) {
        let randomFilter = Math.floor(Math.random() * filterArray.length);
        let indexFilter = filterArray[randomFilter].index;

        styleMachine(indexFilter, machineO, titleVar);

        const copyCasillas = [...casillas];
        copyCasillas[indexFilter].isEmpty = false;
        handleWin(copyCasillas[indexFilter], titleVar);
        setCasillas(copyCasillas);
      } else {
        titleVar.innerHTML = 'Well played!';
      }
    }
  }

  // Definimos la función del botón que resetea el juego para volver a jugar

  const resetGame = () => {
    const resetSpan = document.querySelectorAll('span');

    // Reseteamos el estado de cada casilla
    const newList = [...casillas];
    newList.map((listItem) => {
      listItem.isEmpty = true;
      listItem.isUser = false;
    });
    setCasillas(newList);

    // Reseteamos el aspecto del tablero, ocultando los span y cambiando el título
    resetSpan.forEach((item) => item.style.display = 'none');
    endMatch = false;
    countX1user = 0;
    countX2user = 0; 
    countX3user = 0; 
    countY1user = 0; 
    countY2user = 0;
    countY3user = 0;
    countXYuser = 0;
    countYXuser = 0;
    countX1mach = 0;
    countX2mach = 0;
    countX3mach = 0;
    countY1mach = 0;
    countY2mach = 0; 
    countY3mach = 0; 
    countXYmach = 0;
    countYXmach = 0;
    document.getElementById('title').innerHTML = 'Tic-Tac-Toc';
  }
  
  return (
    <div className="App">
      <div id='title'>
        <Titulo />
      </div>
      <div className='tablero'>
        <Tablero array={casillas} 
                 onClick={handleStatus} 
                 end={endMatch}/>
      </div>
      <button className='buttonPlay' onClick={resetGame}>Reload Game</button>
    </div>
  );
}