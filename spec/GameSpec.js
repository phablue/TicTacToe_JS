describe ("Test Game", function() {
  var game;
  var game_board;

  beforeEach (function () {
    game = new Game();
  });

  describe("Change a current player", function() {
    it ("To 'O', if a current player is 'X'", function() {
      expect (game.change_player("X")).toBe("O");
    });

    it ("To 'X', if a current player is 'O'", function() {
      expect (game.change_player("O")).toBe("X");
    });
  });
});
