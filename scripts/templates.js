var templates = (function (module) {

  window.module = window.module ? window.module : module;

  const cell = function (row, col) {
    const el = utils.createElements('div', [], {
      id: `cell-${row}-${col}`,
      'data-row': row,
      'data-col': col,
      'class': 'cell'
    })
    el.setAttribute('data-mushroom', 'no');
    el.setAttribute('data-poison', 'no');
    return el;
  }

  const mushroomCell = function (row, col) {
    const img = utils.createElements('img', [], {
      'src': "./images/mushroom.png"
    })
    const mCell = cell(row, col);
    mCell.appendChild(img);
    mCell.setAttribute('data-mushroom', 'yes');
    mCell.setAttribute('data-poison', 'no');
    return mCell
  }

  const poisonCell = function (row, col) {
    const img = utils.createElements('img', [], {
      'src': "./images/poison.jpg"
    })
    const pCell = cell(row, col);
    pCell.appendChild(img);
    pCell.setAttribute('data-mushroom', 'no');
    pCell.setAttribute('data-poison', 'yes');
    return pCell
  }

  return {
    cell,
    mushroomCell,
    poisonCell
  }

})(window.module || {})