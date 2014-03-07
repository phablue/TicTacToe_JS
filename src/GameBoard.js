(function() {
  var spotMaker = {
    makeNewSpots: function() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  };

  var GameBoard = {
    spots: spotMaker.makeNewSpots(),

    validSpots: function() {
      var availableSpots = [];
      for (spot in this.spots) {
        if (typeof(this.spots[spot]) === "number") {
          availableSpots.push(this.spots[spot]);
        }
      }
      return availableSpots;
    },

    resetBoard: function(){
      this.spots = spotMaker.makeNewSpots();
    }
  };
  window.GameBoard = GameBoard;
})();
