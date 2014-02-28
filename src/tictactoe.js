var tictactoe = {
  board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  current_player: "X",

  valid_spots: function() {
    var available_spots = [];
    for (spot in this.board) {
      if (typeof(this.board[spot]) === "number") {
        available_spots.push(this.board[spot]);
      }
    }
    return available_spots;
  },

  change_player: function() {
    return this.current_player = (this.current_player == "X" ? "O" : "X");
  },

  choice_spot: function(e) {
    if (e == null) {
      chosen_spot = event.srcElement.id;
    }
    else {
      chosen_spot = e.target.id;
    }
    this.mark_chosen_spot(chosen_spot);
  },

  mark_chosen_spot: function(chosen_spot) {
    document.getElementById(chosen_spot).innerHTML = this.current_player;
    this.board[chosen_spot] = this.current_player;
  },

  // next_turn: function() {
  //   this.change_player();
  //   if(game_over()) {
  //     alert("You win!!");
  //   }
  // },

  game_over: function() {
    return this.game_win(this.board) || this.game_tie(this.board);
  },

  game_win: function() {
    var rules_of_win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (r in rules_of_win) {
      var rule = rules_of_win[r];
      var state = this.board[rule[0]] + this.board[rule[1]] +  this.board[rule[2]];
      if (state == "XXX" || state == "OOO") {
        return true;
      }
    }
    return false;
  },

  game_tie: function() {
    return (this.valid_spots().length) ? false : true;
  },

  game: function() {
    document.click = this.choice_spot;
  }
};
tictactoe.game();
