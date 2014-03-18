(function() {
  var Human = {
    choiceSpot: function(board, chosenSpotId, currentPlayer) {
      if (checkChosenSpotAvailable(chosenSpotId)) {
        this.markChosenSpot(board, chosenSpotId, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(board, chosenSpotId, currentPlayer) {
      this.setChosenSpot(chosenSpotId, currentPlayer);
      board.spots[chosenSpotId] = currentPlayer;
    }, 

    setChosenSpot: function(chosenSpotId, currentPlayer) {
      $("#" + chosenSpotId).text(currentPlayer);
    },

    checkChosenSpotAvailable: function(chosenSpotId) {
      return $("#" + chosenSpotId).text().length
    }
  };
  window.Human = Human;
})();
