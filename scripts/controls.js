var controls = (function (module) {

  window.module = window.module ? window.module : module;

  const _KEY_TO_DIR = {
    ArrowUp: 'UP',
    ArrowDown: 'DOWN',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT'
  };

  let _time = 1000;
  let _timer;
  let _DIR;
  let _pause = false;

  const _getNextPosition = function () {
    const newMarioPostion = Object.assign({}, module.marioPosition);

    switch (_DIR) {
      case 'UP':
        if (newMarioPostion.row === 0) {
          _DIR = 'DOWN';
          return _getNextPosition();
        }
        newMarioPostion.row -= 1;
        break;

      case 'DOWN':
        if (newMarioPostion.row === (module.N - 1)) {
          _DIR = 'UP';
          return _getNextPosition();;
        }
        newMarioPostion.row += 1;
        break;

      case 'RIGHT':
        if (newMarioPostion.col === (module.N - 1)) {
          _DIR = 'LEFT';
          return _getNextPosition();;
        }
        newMarioPostion.col += 1;
        break;

      case 'LEFT':
        if (newMarioPostion.col === 0) {
          _DIR = 'RIGHT';
          return _getNextPosition();;
        }
        newMarioPostion.col -= 1;
        break;
    }
    return newMarioPostion;
  };

  const _moveMario = () => {
    const newPos = _getNextPosition();
    if (dom.isMushroom(newPos)) {
      _time = _time / 2
      module.marioPosition = newPos;
      dom.buildBoard();
      _resetAuto();
    }
    else if (dom.isPoison(newPos)) {
      alert('Game Over')
      clearInterval(_timer)
    }
    else {
      dom.moveMario(newPos);
    }
  };

  const _resetAuto = () => {
    clearInterval(_timer);
    _autoMove();
  };

  const _onKeyPress = (event) => {
    if (_KEY_TO_DIR[event.key]) {
      _DIR = _KEY_TO_DIR[event.key];
      _resetAuto()
    }
    else if (event.key === ' ') {
      if (_pause) {
        _pause = false;
        _autoMove();
      } else {
        _pause = true;
        clearInterval(_timer);
      }
    }
  };

  const _autoMove = () => {
    _timer = setInterval(function () {
      _moveMario();
    }, _time);
  };

  const init = () => {
    document.addEventListener('keyup', _onKeyPress);
  };

  return {
    init
  }
})(window.module || {})