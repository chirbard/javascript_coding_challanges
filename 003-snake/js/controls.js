class Controls {
  constructor() {
    this.direction = 'right';

    this.#addKeyBoardListeners();
  }

  #addKeyBoardListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.direction = 'up';
          break;
        case 'ArrowDown':
          this.direction = 'down';
          break;
        case 'ArrowLeft':
          this.direction = 'left';
          break;
        case 'ArrowRight':
          this.direction = 'right';
          break;
      }
    };
  }
}
