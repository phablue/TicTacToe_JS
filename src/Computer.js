(function() {
  var Computer = {
    currentPlayer: "",

    chooseTheBestSpot: function(board, currentPlayer) {
      var chosenSpot;
      UI.showComputerMessage();
      chosenSpot = minimax(board, currentPlayer)[1];
      Human.markChosenSpot(board, chosenSpot, currentPlayer);
      UI.hideComputerMessage();
    },

    minimax: function(board, currentPlayer, level) {
      this.currentPlayer = currentPlayer;
      var chosenSpot;
      var point = -1;
      var bestPoint = -1;
      var bestSpot = null;
      var availableSpots = board.validSpots();

      if (typeof(level) === "undefined") {
        level = 0;
      }
      if (GameRules.gameOver(board)) {
        return this.get_point(board, this.currentPlayer, level);
      }
      for (var i in availableSpots) {
        chosenSpot = availableSpots[i];
        this.markChosenSpot(board, this.currentPlayer);
        point = -this.minimax(board, this.changePlayer(this.currentPlayer), level += 1)[0];
        this.markChosenSpot(board, chosenSpot);
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = availableSpots[i];
        }
      }
      return [bestPoint, bestSpot];
    },

    markChosenSpot: function(board, currentPlayer) {
      board.spots[chosenSpot] = currentPlayer;
    },    

    getPoint: function(board, level) {
      if (GameRules.gameWin(board)) {
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
