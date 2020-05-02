var dom = (function (module) {

  window.module = window.module ? window.module : module;

  const _nextToMario = (i, j) => {
    return (i < module.marioPosition.row + 2 && i > module.marioPosition.row - 2) || (j > module.marioPosition.col - 2 && j < module.marioPosition.col + 2)
  }

  const _nextToMushroom = (i, j) => {
    if (module.mushroomPositions.length) {
      return (i < module.mushroomPositions[0].row + 2 && i > module.mushroomPositions[0].row - 2) || (j > module.mushroomPositions[0].col - 2 && j < module.mushroomPositions[0].col + 2)
    }
    return false;
  }

  const _nextToPoison = (i, j) => {
    module.poisonPositions.forEach(poisonCell => {
      if ((i < poisonCell.row + 2 && i > poisonCell.row - 2) || (j > poisonCell.col - 2 && j < poisonCell.col + 2)) {
        return true;
      }
    });
    return false
  }


  const buildBoard = () => {
    const gameWidget = document.getElementById('game-widget');
    gameWidget.innerHTML = "";
    module.mushroomPositions = [];
    module.poisonPositions = [];

    for (let i = 0; i < module.N; i++) {
      const row = utils.createElements('div', [], {
        'class': 'row clearfix'
      });
      for (let j = 0; j < module.N; j++) {

        let cell;
        const random = utils.randomGenerator();

        if (module.mushroomPositions.length === 0 && random === 0 && !_nextToMario(i, j) && !_nextToPoison(i, j)) {
          const pos = { row: i, col: j };
          module.mushroomPositions.push(pos)
          cell = templates.mushroomCell(i, j);
        }
        else if (module.poisonPositions.length < module.N && (random < (module.N / 2)) && !_nextToMario(i, j) && !_nextToMushroom(i, j)) {
          const pos = { row: i, col: j };
          module.poisonPositions.push(pos)
          cell = templates.poisonCell(i, j);
        }
        else {
          cell = templates.cell(i, j);
        }

        row.appendChild(cell);
      }
      gameWidget.appendChild(row);
    }
    const marioCell = document.getElementById(`cell-${module.marioPosition.row}-${module.marioPosition.col}`);
    const img = utils.createElements('img', [], {
      'src': "./images/mario.png"
    });
    marioCell.appendChild(img);
  }

  const moveMario = (pos) => {
    const marioCell = document.getElementById(`cell-${module.marioPosition.row}-${module.marioPosition.col}`);
    const nextCell = document.getElementById(`cell-${pos.row}-${pos.col}`);
    marioCell.querySelector('img').remove();
    const img = utils.createElements('img', [], {
      'src': "./images/mario.png"
    });
    module.marioPosition = pos;
    nextCell.appendChild(img);
  }

  const isMushroom = (pos) => {
    const cell = document.getElementById(`cell-${pos.row}-${pos.col}`);
    return (cell.dataset.mushroom === 'yes');
  }

  const isPoison = (pos) => {
    const cell = document.getElementById(`cell-${pos.row}-${pos.col}`);
    return (cell.dataset.poison === 'yes');
  }

  return {
    buildBoard,
    moveMario,
    isMushroom,
    isPoison
  }

})(window.module);