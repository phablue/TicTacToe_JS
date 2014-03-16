(function() {
  var Human = {
    choiceSpot: function(e, board, currentPlayer) {
      var chosenSpot;
      chosenSpot = e.target.id;
      if ($("#" + chosenSpot).text() == "") {
        this.markChosenSpot(board, chosenSpot, currentPlayer);
      }
      else {
        UI.spotErrorMessage();
        this.choiceSpot(e, board, currentPlayer);
      }
    },

    markChosenSpot: function(board, chosenSpot, currentPlayer) {
      $("#" + chosenSpot).text(currentPlayer);
      board.spots[chosenSpot] = currentPlayer;
    }
  };
  window.Human = Human;
})();
