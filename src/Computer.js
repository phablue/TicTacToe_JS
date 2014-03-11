(function() {
  var Computer = {
    currentPlayer: "",

    chooseTheBestSpot: function(board, currentPlayer) {

    },

    minimax: function(board, currentPlayer, level) {
      this.currentPlayer = currentPlayer;
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
        Human.markChosenSpot(board, availableSpots[i], this.currentPlayer);
        point = -minimax(board, changePlayer(this.currentPlayer), level += 1)[0];
        Human.markChosenSpot(board, availableSpots[i], "");
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = availableSpots[i];
        }
      }
      return [bestPoint, bestSpot];
    },

    getPoint: function(board, current_player, level) {
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
