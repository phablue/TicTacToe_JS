(function() {
  var Human = {
    choiceSpot: function(board, chosenSpotId, currentPlayer) {
      if ($("#" + chosenSpotId).text() == "") {
        this.markChosenSpot(board, chosenSpotId, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(board, chosenSpotId, currentPlayer) {
      $("#" + chosenSpotId).text(currentPlayer);
      board.spots[chosenSpotId] = currentPlayer;
    }
  };
  window.Human = Human;
})();
