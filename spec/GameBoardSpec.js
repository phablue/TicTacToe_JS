describe ("Test a game board", function() {
  var game_board;

  beforeEach (function() {
    game_board = new GameBoard();
  });

  describe ("Get valid spots from a board", function() {
    it ("valid spots are [3, 5, 7, 9]", function() {
      game_board.spots = ["X", "O", 3, "X", 5, "O", 7, "X", 9];
      expect (game_board.valid_spots()).toEqual([3, 5, 7, 9]);
    });

    it ("valid spots are [1, 3, 5, 9]", function() {
      game_board.spots = [1, "O", 3, "X", 5, "O", "X", "X", 9];
      expect (game_board.valid_spots()).toEqual([1, 3, 5, 9]);
    });
  });
});