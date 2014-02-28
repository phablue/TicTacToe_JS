var tictactoe = {
  board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  current_player: "X",

  change_player: function(current_player) {
    return current_player = (current_player == "X" ? "O" : "X");
  },

  mark_chosen_spot: function(e) {
    var chosen_spot;
    if (e == null) {
      chosen_spot = event.srcElement.id;
    }
    else {
      chosen_spot = e.target.id;
    }
    document.getElementById(chosen_spot).innerHTML = this.current_player;
    console.log(this.current_player);
    board[chosen_spot] = current_player;
    this.change_player(current_player);
  },

  valid_spots: function(board) {
    var available_spots = [];
    for (spot in board) {
      if (typeof(board[spot]) === "number") {
        available_spots.push(board[spot]);
      }
    }
    return available_spots;
  },

  game_over: function(board) {
    return this.game_win(board) || this.game_tie(board);
  },

  game_win: function(board) {
    var rules_of_win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (r in rules_of_win) {
      var rule = rules_of_win[r];
      var state = board[rule[0]] + board[rule[1]] +  board[rule[2]];
      if (state == "XXX" || state == "OOO") {
        return true;
      }
    }
    return false;
  },

  game_tie: function(board) {
    return tie = ((this.valid_spots(board).length) ? false : true);
  },

  game: function() {
      document.onclick = this.mark_chosen_spot;
      document.onclick = this.mark_chosen_spot;
    }
};
tictactoe.game();
