Human = function(board, currentPlayer) {
  this.currentPlayer = currentPlayer;

  this.choiceSpot = (function (_this, board) {
    var chosenSpot;
    return ($("tr td").click(function(e) {
        chosenSpot = e.target.id;
        _this.markChosenSpot(board, chosenSpot, _this.currentPlayer);
        _this.changePlayer(_this.currentPlayer);
      }));
  })(this, board);

  this.markChosenSpot = function(board, chosenSpot, currentPlayer) {
    $("#" + chosenSpot).text(currentPlayer);
    board.spots[chosenSpot] = currentPlayer;
  };

  this.changePlayer = function(currentPlayer) {
    this.currentPlayer = currentPlayer == "X" ? "O" : "X";
  };
}
