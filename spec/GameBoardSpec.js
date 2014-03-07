describe ("Test a game board", function() {
  var gameboard;

  beforeEach (function() {
    gameboard = window.GameBoard;
  });

  describe ("Get row spots", function() {
    it ("is [[1,2,3], [4,5,6], [7,8,9]]", function() {
      expect (gameboard.rowSpots()).toEqual([[1,2,3], [4,5,6], [7,8,9]]);
    });
  });

  describe ("Get column spots", function() {
    it ("is [[1,4,7], [2,5,8], [3,6,9]]", function() {
      expect (gameboard.columnSpots()).toEqual([[1,4,7], [2,5,8], [3,6,9]]);
    });
  });

  describe ("Get diagonal spots", function() {
    it ("is [[1,5,9], [3,5,7]]", function() {
      expect (gameboard.diagonalSpots()).toEqual([[1,5,9], [3,5,7]]);
    });
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

  describe ("Reset Board", function() {
    it ("Changes to [1, 2, 3, 4, 5, 6, 7, 8, 9]", function() {
      gameboard.spots = ["X", "O", 3, "X", 5, "O", 7, "X", 9];
      gameboard.resetBoard();
      expect (gameboard.spots).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});