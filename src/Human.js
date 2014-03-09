(function() {
  var ui = window.UI;
  var Human = {
    choiceSpot: function(board, currentPlayer) {
      var chosenSpot;
      chosenSpot = event.target.id;
      if ($("#" + chosenSpot).text() == "") {
        this.markChosenSpot(board, chosenSpot, currentPlayer);
      }
      else {
        ui.spotErrorMessage();
        return;
      }
    },

    markChosenSpot: function(board, chosenSpot, currentPlayer) {
      $("#" + chosenSpot).text(currentPlayer);
      board.spots[chosenSpot] = currentPlayer;
    },

    changePlayer: function(currentPlayer) {
      return currentPlayer == "X" ? "O" : "X";
    }
  };
  window.Human = Human;
})();
