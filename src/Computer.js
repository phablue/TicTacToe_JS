(function() {
  var Computer = {
    chooseTheBestSpot: function(currentPlayer) {
      var chosenSpot;
      UI.hideComputerMessage();
      UI.showComputerMessage();
      chosenSpot = minimax(GameBoard, currentPlayer)[1];
      Human.markChosenSpot(GameBoard, chosenSpot, currentPlayer);
      UI.hideComputerMessage();
    },

    minimax: function(currentPlayer, level) {
      var chosenSpot;
      var point = -1;
      var bestPoint = -1;
      var bestSpot = null;
      var availableSpots = GameBoard.validSpots();
      if (typeof(level) === "undefined") {
        level = 0;
      }
      if (GameRules.gameOver(GameBoard)) {
        return [this.getPoint(level), null];
      }
      for (var spot in availableSpots) {
        chosenSpot = availableSpots[spot];
        this.markChosenSpot(chosenSpot, currentPlayer);
        point = -(this.minimax(this.changePlayer(currentPlayer), level += 1)[0]);
        this.markChosenSpot(chosenSpot, chosenSpot);
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = chosenSpot;
        }
      }
      return [bestPoint, bestSpot];
    },

    markChosenSpot: function(chosenSpot, currentPlayer) {
      GameBoard.spots[chosenSpot-1] = currentPlayer;
    },    

    getPoint: function(level) {
      if (GameRules.gameWin(GameBoard)) {
        return (1.0 / -level)
      }
      return 0
    },

    changePlayer: function(currentPlayer) {
      return currentPlayer == "X" ? "O" : "X";
    }
  }
  window.Computer = Computer;
})();
