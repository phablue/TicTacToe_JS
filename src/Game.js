(function() {
  var input;
  var Game = {
    user: "X",
    computer: "O",
    goFirst: null,

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    firstMove: function(button) {
      var input = UI.askFirstMove();
      if (input === null || input === "") {
        return true;
      }
      else if(input == "y" || input == "n") {
        UI.visualAfterChoice(button);
        this.goFirst = input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    checkGameOver: function(currentPlayer) {
      if(GameRules.gameOver(GameBoard)) {
        UI.visualWhenGameOver(currentPlayer);
        return true;
      }
      return false;
    },

    humanChoice: function(chosenSpotID, callback) {
      if (Human.choiceSpot(GameBoard, chosenSpotID, Game.user)) {
        UI.unbindClick("tr td");
        UI.hideHumanMessage();
        if (Game.checkGameOver(Game.user) === false) {
          callback(Game.play);
        }
      }
      else {
        return;
      }
    },

    computerChoice: function(callback) {
      Computer.chooseTheBestSpot(Game.computer);
      if (Game.checkGameOver(Game.computer) === false) {
        callback(Game.play);
      }
    },

    introGame: function(button) {
      UI.newGame();
      if (Game.firstMove(button) === true) {
        return;
      }
      Game.play();
    },

    startGame: function() {
      UI.startGame();
    },

    play: function() {
      if (Game.goFirst === "y") {
        Game.humanPlay();
      }
      else if (Game.goFirst === "n") {
        Game.computerPlay();
      }
    }
  };
  window.Game = Game;
})();
