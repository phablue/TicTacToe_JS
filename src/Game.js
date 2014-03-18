(function() {
  var input;
  var Game = {
    user: "X",
    computer: "O",
    goFirst: null,

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    visualAfterChoice: function(button) {
      if (UI.getClass(button) == "btn btn-start") {
        UI.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else {
        UI.toggleDisplayedButton(".btn-restart", ".btn-new");
      }
    },

    visualAfterGameOver: function() {
      UI.unbindClick("tr td");
      UI.toggleDisplayedButton(".btn-new", ".btn-restart");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      this.restartGame();
      return true;
    },

    firstMove: function(button) {
      var input = UI.askFirstMove();
      if (input === null || input === "") {
        return true;
      }
      else if(input == "y" || input == "n") {
        this.visualAfterChoice(button);
        this.goFirst = input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    nextTurn: function(currentPlayer) {
      if(GameRules.gameWin(GameBoard)) {
        UI.winMessage(this.winner(currentPlayer));
        return this.visualAfterGameOver();
      }
      else if(GameRules.gameTie(GameBoard)) {
        UI.tieMessage();
        return this.visualAfterGameOver();
      }
      return false;
    },

    humanPlay: function(callback) {
      UI.showHumanMessage();
      $("tr td").click(function(e) {
        if (Human.choiceSpot(GameBoard, e.target.id, Game.user)) {
          UI.unbindClick("tr td");
          UI.hideHumanMessage();
          if (Game.nextTurn(Game.user) === false) {
            callback(Game.play);
          }
        }
        else {
          return;
        }
      })
    },

    computerPlay: function(callback) {
      UI.showComputerMessage(Game.computerChoice)
    },

    computerChoice: function(callback) {
      Computer.chooseTheBestSpot(Game.computer);
      if (Game.nextTurn(Game.computer) === false) {
        callback();
      }
    },

    introGame: function(button) {
      Game.newGame();
      if (Game.firstMove(button) === true) {
        return;
      }
      Game.play();
    },

    play: function() {
      if (Game.goFirst === "y") {
        Game.humanPlay(Game.computerPlay);
      }
      else if (Game.goFirst === "n") {
        Game.computerPlay(Game.humanPlay);
      }
    },

    startGame: function() {
      UI.hideButton(".btn-restart", ".btn-new");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      UI.ClickButton(".btn-start", Game.introGame);
    },

    resetGame: function() {
      UI.removeText("tr td");
      GameBoard.resetBoard();
    },

    newGame: function() {
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      UI.ClickButton(".btn-new", Game.introGame);
    },

    restartGame: function() {
      UI.ClickButton(".btn-restart", Game.introGame);
    }
  };
  window.Game = Game;
})();
