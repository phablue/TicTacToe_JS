(function() {
  var Human = {
    currentPlayer: "",

    choiceSpot: function(board, currentPlayer) {
      this.currentPlayer = currentPlayer;
      var chosenSpot;
      var _this = this;
      $("tr td").click(function(e) {
          chosenSpot = e.target.id;
          _this.markChosenSpot(board, chosenSpot, _this.currentPlayer);
          _this.changePlayer(_this.currentPlayer);
      });
    },
    // this.choiceSpot = (function (_this, board) {
    //   var chosenSpot;
    //   return ($("tr td").click(function(e) {
    //       chosenSpot = e.target.id;
    //       _this.markChosenSpot(board, chosenSpot, _this.currentPlayer);
    //       _this.changePlayer(_this.currentPlayer);
    //     }));
    // })(this, this.board);
    markChosenSpot: function(board, chosenSpot, currentPlayer) {
      $("#" + chosenSpot).text(currentPlayer);
      board.spots[chosenSpot] = currentPlayer;
    },

    changePlayer: function(currentPlayer) {
      this.currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
  };
  window.Human = Human;
})();
