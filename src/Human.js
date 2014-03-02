Human = function(board, current_player) {
  this.choice_spot = (function (_this, board, current_player) {
    var chosen_spot;
    return ($("tr td").click(function(e) {
        chosen_spot = e.target.id;
        _this.mark_chosen_spot(board, chosen_spot, current_player);
      }));
  })(this, board, current_player);

  this.mark_chosen_spot = function(board, chosen_spot, current_player) {
    $("#" + chosen_spot).text(current_player);
    board.spots[chosen_spot] = current_player;
  };
}
