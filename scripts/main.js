var main = (function (module) {
  window.module = window.module ? window.module : module;
  module.N = 0;
  module.NAME = ''
  module.poisonPositions = [];
  module.mushroomPositions = [];
  module.marioPosition = {
    row: 0,
    col: 0
  }

  const init = function () {
    module.NAME = window.prompt('Enter your name', 'Unknown');
    module.N = parseInt(window.prompt('Enter no of column', 8));

    // module.NAME = '';
    // module.N = 16;

    dom.buildBoard();
    controls.init();
  }

  return { init };
})(window.module || {})

document.addEventListener('DOMContentLoaded', () => { main.init() }, { once: true });
