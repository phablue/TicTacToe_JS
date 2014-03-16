(function() {
  var Human = {
    choiceSpot: function(e, board, currentPlayer) {
      var chosenSpot = e.target.id;
      if ($("#" + chosenSpot).text() == "") {
        this.markChosenSpot(board, chosenSpot, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(board, chosenSpot, currentPlayer) {
      $("#" + chosenSpot).text(currentPlayer);
      board.spots[chosenSpot] = currentPlayer;
    }
  };
  window.Human = Human;
})();
