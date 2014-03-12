(function() {
  var Computer = {
    currentPlayer: "",

    chooseTheBestSpot: function(currentPlayer) {
      var chosenSpot;
      UI.showComputerMessage();
      chosenSpot = minimax(GameBoard, currentPlayer)[1];
      Human.markChosenSpot(GameBoard, chosenSpot, currentPlayer);
      UI.hideComputerMessage();
    },

    minimax: function(currentPlayer, level) {
      this.currentPlayer = currentPlayer;
      var chosenSpot;
      var point = -1;
      var bestPoint = -1;
      var bestSpot = null;
      var availableSpots = GameBoard.validSpots();

      if (typeof(level) === "undefined") {
        level = 0;
      }
      if (GameRules.gameOver(GameBoard)) {
        return this.get_point(level);
      }
      for (var i in availableSpots) {
        chosenSpot = availableSpots[i];
        this.markChosenSpot(this.currentPlayer);
        point = -this.minimax(this.changePlayer(this.currentPlayer), level += 1)[0];
        this.markChosenSpot(chosenSpot);
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = availableSpots[i];
        }
      }
      return [bestPoint, bestSpot];
    },

    markChosenSpot: function(currentPlayer) {
      GameBoard.spots[chosenSpot] = currentPlayer;
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
});
