(function() {
  var Human = {
    choiceSpot: function(board, currentPlayer) {
      var chosenSpot;
      var _this = this;
      $("tr td").click(function(e) {
        chosenSpot = e.target.id;
        if ($("#" + chosenSpot).text() == "") {
          _this.markChosenSpot(board, chosenSpot, currentPlayer);
        }
        else {
          UI.spotErrorMessage();
          return;
        }
        e.stopPropagation();
      });
    },

    markChosenSpot: function(board, chosenSpot, currentPlayer) {
      $("#" + chosenSpot).text(currentPlayer);
      board.spots[chosenSpot] = currentPlayer;
    }
  };
  window.Human = Human;
})();
