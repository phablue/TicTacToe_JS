(function() {
  var input;
  var Game = {
    currentPlayer: null,
    goFirst: null,

    changeCurrentPlayer: function(currentPlayer) {
      this.currentPlayer = currentPlayer == "X" ? "O" : "X";
    },

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    firstMove: function() {
      var input = UI.askFirstMove();
      if(input == "y" || input == "n") {
        UI.toggleDisplayedButton(".btn-restart", ".btn-new");
        this.goFirst = input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    checkGameOver: function(currentPlayer) {
      Game.changeCurrentPlayer(Game.currentPlayer);
      if(GameRules.gameOver(GameBoard)) {
        UI.visualWhenGameOver(currentPlayer);
        return true;
      }
      return false;
    },

    humanChoice: function(chosenSpotID, callback) {
      if (Human.choiceSpot(GameBoard, chosenSpotID, Game.currentPlayer)) {
        UI.unbindClick("tr td");
        UI.hideHumanMessage();
        if (Game.checkGameOver(Game.currentPlayer) === false) {
          callback(Game.playGame);
        }
      }
      else {
        return;
      }
    },

    computerChoice: function(callback) {
      Computer.chooseTheBestSpot(Game.currentPlayer);
      if (Game.checkGameOver(Game.currentPlayer) === false) {
        callback(Game.playGame);
      }
    },

    playGame: function() {
      if(UI.gameType === ".player") {
        if (Game.goFirst === "y") {
          UI.humanPlay();
        }
        else if (Game.goFirst === "n") {
          UI.computerPlay();
        }
      }
      else { 
        UI.humanPlay();
      }
    }
  };
  window.Game = Game;
})();
