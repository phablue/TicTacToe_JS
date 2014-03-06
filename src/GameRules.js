(function() {
  var GameRules = {
    gameOver: function(board) {
      return this.gameWin(board) || this.gameWin(board);
    },

    gameWin: function(board) {
      var rulesOfWin = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
      for (r in rulesOfWin) {
        var rule = rulesOfWin[r];
        var state = board.spots[rule[0]] + board.spots[rule[1]] +  board.spots[rule[2]];
        if (state == "XXX" || state == "OOO") {
          return true;
        }
      }
      return false;
    },

    gameTie: function(board) {
      return board.validSpots().length === 0;
    }
  };
  window.GameRules = GameRules;
})();
