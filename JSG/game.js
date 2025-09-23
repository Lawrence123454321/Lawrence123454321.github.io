/* Copyright (C) lliu.fun - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lawrence Liu lawrence-liu12345@outlook.com, September 2025
 */
// game.js
document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const size = 4;
  let cells = [];
  let score = 0;

  function createBoard() {
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameBoard.appendChild(cell);
      cells.push(cell);
    }
    addNumber();
    addNumber();
  }

  function addNumber() {
    let emptyCells = cells.filter(cell => cell.innerText === '');
    if (emptyCells.length === 0) return;
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = Math.random() > 0.1 ? 2 : 4;
    randomCell.classList.add(`cell-${randomCell.innerText}`);
  }

  function move(direction) {
    let hasMoved = false;
    for (let i = 0; i < size; i++) {
      let rowOrCol = [];
      for (let j = 0; j < size; j++) {
        let index = direction === 'left' || direction === 'right' ? i * size + j : j * size + i;
        rowOrCol.push(cells[index]);
      }
      if (direction === 'right' || direction === 'down') rowOrCol.reverse();
      let newRowOrCol = slide(rowOrCol);
      if (direction === 'right' || direction === 'down') newRowOrCol.reverse();
      for (let j = 0; j < size; j++) {
        let index = direction === 'left' || direction === 'right' ? i * size + j : j * size + i;
        if (cells[index].innerText !== newRowOrCol[j].innerText) hasMoved = true;
        cells[index].innerText = newRowOrCol[j].innerText;
        cells[index].className = 'cell';
        if (cells[index].innerText !== '') cells[index].classList.add(`cell-${cells[index].innerText}`);
      }
    }
    if (hasMoved) {
      addNumber();
      updateScore();
      if (checkGameOver()) {
        setTimeout(() => alert('Game Over! Score: '+score+'Press Ctrl+R to play again.'), 100);
      }
    }
  }

  function slide(rowOrCol) {
    let arr = rowOrCol.filter(cell => cell.innerText !== '').map(cell => parseInt(cell.innerText));
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];  // 更新分数
        arr.splice(i + 1, 1);
      }
    }
    while (arr.length < size) arr.push('');
    return arr.map(num => {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = num;
      return cell;
    });
  }

  function handleKey(e) {
    switch (e.key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
    }
  }

  function updateScore() {
    scoreElement.innerText = score;
  }

  function checkGameOver() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let index = i * size + j;
        if (cells[index].innerText === '') return false;
        if (j < size - 1 && cells[index].innerText === cells[index + 1].innerText) return false;
        if (i < size - 1 && cells[index].innerText === cells[index + size].innerText) return false;
      }
    }
    return true;
  }

  createBoard();
  document.addEventListener('keydown', handleKey);
});
