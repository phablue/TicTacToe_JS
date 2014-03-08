describe ("Test Game", function() {
  describe ("The message pops up", function() {
    var winMessage;
    var tieMessage;
    var unbind;

    beforeEach (function() {
      winMessage = spyOn(UI, "winMessage");
      tieMessage = spyOn(UI, "tieMessage");
      unbind = spyOn($.fn, "unbind")
    });

    describe ("Test Message", function() {
      it ("Pops up for win and click event doesn't work,if the Game win.", function() {
        Game.board.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        Game.nextTurn();
        expect(winMessage).toHaveBeenCalled();
        expect(unbind).toHaveBeenCalled();
      });

      it ("Pops up for tie and click event doesn't work,if the Game tie.", function() {
        Game.board.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        Game.nextTurn();
        expect(tieMessage).toHaveBeenCalled();
        expect(unbind).toHaveBeenCalled();
      });

      it ("Not Pops up any message and click event works,if the Game is not won or tied.", function() {
        Game.board.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        Game.nextTurn();
        expect(winMessage).not.toHaveBeenCalled();
        expect(tieMessage).not.toHaveBeenCalled();
        expect(unbind).not.toHaveBeenCalled();
      });
    });
  });
});
