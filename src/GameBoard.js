GameBoard = function() {
  this.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  this.valid_spots = function() {
    var available_spots = [];
    for (spot in this.spots) {
      if (typeof(this.spots[spot]) === "number") {
        available_spots.push(this.spots[spot]);
      }
    }
    return available_spots;
  };
};