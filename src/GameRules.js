GameRules = function() {
  this.game_over = function(board) {
    return this.game_win(board) || this.game_tie(board);
  };

  this.game_win = function(board) {
    var rules_of_win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (r in rules_of_win) {
      var rule = rules_of_win[r];
      var state = board.spots[rule[0]] + board.spots[rule[1]] +  board.spots[rule[2]];
      if (state == "XXX" || state == "OOO") {
        return true;
      }
    }
    return false;
  };

  this.game_tie = function(board) {
    return board.valid_spots().length ? false : true;
  };
};
