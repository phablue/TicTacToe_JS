(function() {
  var Computer = {
    currentPlayer: "",

    chooseTheBestSpot: function(board, currentPlayer) {
      var chosenSpot;
      chosenSpot = minimax(board, current_player)[1];
      Human.markChosenSpot(choice, current_player);
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
        Human.markChosenSpot(board, chosenSpot, this.currentPlayer);
        point = -this.minimax(board, this.changePlayer(this.currentPlayer), level += 1)[0];
        this.unmarkChosenSpot(board, chosenSpot);
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = availableSpots[i];
        }
      }
      return [bestPoint, bestSpot];
    },

    unmarkChosenSpot: function(board, chosenSpot) {
      $("#" + chosenSpot).empty();
      board.spots[chosenSpot] = chosenSpot;
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
