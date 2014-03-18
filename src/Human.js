(function() {
  var Human = {
    choiceSpot: function(board, chosenSpotId, currentPlayer) {
      if (this.checkChosenSpotAvailable(chosenSpotId)) {
        this.markChosenSpot(board, chosenSpotId, currentPlayer);
        return true;
      }
      else {
        UI.spotErrorMessage();
        return false;
      }
    },

    markChosenSpot: function(board, chosenSpotId, currentPlayer) {
      UI.setTextContents(chosenSpotId, currentPlayer);
      board.spots[chosenSpotId] = currentPlayer;
    },

    checkChosenSpotAvailable: function(chosenSpotId) {
      return UI.getTextContents(chosenSpotId) == ""
    }
  };
  window.Human = Human;
})();
