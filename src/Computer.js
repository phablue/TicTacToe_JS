(function() {
  var Computer = {
    currentPlayer: "",

    chooseTheBestSpot: function(currentPlayer) {
      var chosenSpot;
      UI.hideComputerMessage();
      this.currentPlayer = currentPlayer;
      UI.showComputerMessage();
      chosenSpot = minimax(GameBoard, this.currentPlayer)[1];
      Human.markChosenSpot(GameBoard, chosenSpot, this.currentPlayer);
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
        return this.getPoint(level);
      }
      for (var spot in availableSpots) {
        chosenSpot = availableSpots[spot];
        console.log(availableSpots[spot]);
        this.markChosenSpot(chosenSpot, this.currentPlayer);
        point = -(this.minimax(this.changePlayer(this.currentPlayer), level += 1)[0]);
        this.markChosenSpot(chosenSpot, chosenSpot);
        if (point > bestPoint) {
          bestPoint = point;
          bestSpot = chosenSpot;
        }
      }
      return [bestPoint, bestSpot];
    },

    markChosenSpot: function(chosenSpot, currentPlayer) {
      GameBoard.spots[chosenSpot] = currentPlayer;
    },    

    getPoint: function(level) {
      if (GameRules.gameWin(GameBoard)) {
        return (1.0 / -level)
      }
      return 0
    },

    changePlayer: function(currentPlayer) {
      this.currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
  }
  window.Computer = Computer;
})();
