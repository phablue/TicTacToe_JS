(function() {
  var GameRules = {
    winRequirementForRow: function(board) {
      return this.winRequirement(board.rowSpots());
    },

    winRequirementForColumn: function(board) {
      return this.winRequirement(board.columnSpots());
    },

    winRequirementForDiagonal: function(board) {
      return this.winRequirement(board.diagonalSpots());
    },

    winRequirement: function(spots) {
      for (i in spots) {
        if (this.checkForWin(spots[i])) {
          return true;
        }
      }
      return false
    },

    checkForWin: function(spots) {
      return spots.toString() == "X,X,X" || spots.toString() == "O,O,O";
    },

    gameWin: function(board) {
      return this.winRequirementForRow(board) || this.winRequirementForColumn(board) || this.winRequirementForDiagonal(board)
    },

    gameTie: function(board) {
      return board.validSpots().length == 0;
    },

    gameOver: function(board) {
      return this.gameWin(board) || this.gameTie(board);
    }
  };
  window.GameRules = GameRules;
})();
