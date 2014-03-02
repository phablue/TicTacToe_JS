Game = function() {
  this.change_player = function(current_player) {
    return current_player == "X" ? "O" : "X";
  };

  this.next_turn = function(board, current_player) {
    if(rules.game_over(board)) {
      alert("You win!!");
      $("tr td").off("click", "**");
    }
    this.change_player(current_player);
  };
}
