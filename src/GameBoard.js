(function() {
  var GameBoard = {
    spots: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    validSpots: function() {
      var availableSpots = [];
      for (spot in this.spots) {
        if (typeof(this.spots[spot]) === "number") {
          availableSpots.push(this.spots[spot]);
        }
      }
      return availableSpots;
    }
  };
  window.GameBoard = GameBoard;
})();
