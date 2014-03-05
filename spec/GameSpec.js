describe ("Test Game", function() {
  var game;

  beforeEach (function () {
    game = window.Game;
  });

  describe ("The message pops up", function() {
    var alert;
    var off_click;

    beforeEach (function() {
      alert = spyOn(window, "alert");
      off_click = spyOn($.fn, "off")
    });

    describe ("Test Message", function() {
      it ("Pops up for win and click event doesn't work,if the game win.", function() {
        game.board.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        game.nextTurn();
        expect(alert).toHaveBeenCalledWith("Congratulations.\nYou win!!");
        expect(off_click).toHaveBeenCalled();
      });

      it ("Pops up for tie and click event doesn't work,if the game tie.", function() {
        game.board.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        game.nextTurn();
        expect(alert).toHaveBeenCalledWith("Game is tied.\nGame Over.");
        expect(off_click).toHaveBeenCalled();
      });

      it ("Not Pops up any message and click event works,if the game is not won or tied.", function() {
        game.board.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        game.nextTurn();
        expect(alert).not.toHaveBeenCalledWith("Congratulations.\nYou win!!");
        expect(alert).not.toHaveBeenCalledWith("Game is tied.\n Game Over.");
        expect(off_click).not.toHaveBeenCalled();
      });
    });
  });
});
