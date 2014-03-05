describe ("Test a game board", function() {
  var gameboard;

  beforeEach (function() {
    gameboard = window.GameBoard;
  });

  describe ("Get valid spots from a board", function() {
    it ("valid spots are [3, 5, 7, 9]", function() {
      gameboard.spots = ["X", "O", 3, "X", 5, "O", 7, "X", 9];
      expect (gameboard.validSpots()).toEqual([3, 5, 7, 9]);
    });

    it ("valid spots are [1, 3, 5, 9]", function() {
      gameboard.spots = [1, "O", 3, "X", 5, "O", "X", "X", 9];
      expect (gameboard.validSpots()).toEqual([1, 3, 5, 9]);
    });
  });
});