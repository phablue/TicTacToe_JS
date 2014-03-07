(function() {
  var spotMaker = {
    makeNewSpots: function() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  };
  var gridSide = Math.sqrt(spotMaker.makeNewSpots().length);
  var limited = spotMaker.makeNewSpots().length
  var GameBoard = {
    spots: spotMaker.makeNewSpots(),

    rowSpots: function() {
      var i = 0;
      var rowspots = [];
      while (i < limited) {
        rowspots.push(this.spots.slice(i, i + gridSide));
        i += gridSide;
      }
      return rowspots;
    },

    columnSpots: function() {
      var columnspots = [];
      for (var i = 0; i < gridSide; i++) {
        columnspots.push([this.spots[i], this.spots[i + gridSide], this.spots[i + gridSide * 2]]);
      }
      return columnspots;
    },

    diagonalSpots: function() {
      var leftIndex = gridSide - 1;
      var rightIndex = gridSide + 1;
      var diagonalspots = [];
      diagonalspots.push([this.spots[0], this.spots[rightIndex * 1], this.spots[rightIndex * 2]]);
      diagonalspots.push([this.spots[leftIndex], this.spots[leftIndex * 2], this.spots[leftIndex * 3]]);
      return diagonalspots;
    },

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
