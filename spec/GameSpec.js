describe ("Test Game", function() {
  describe ("The message pops up", function() {
    var winMessage;
    var tieMessage;
    var visualAfterGameOver;

    beforeEach (function() {
      winMessage = spyOn(UI, "winMessage");
      tieMessage = spyOn(UI, "tieMessage");
      visualAfterGameOver = spyOn(Game, "visualAfterGameOver");
    });

    describe ("Test Message", function() {
      it ("Pops up for win and click event doesn't work,if the Game win.", function() {
        GameBoard.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        Game.nextTurn();
        expect(winMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      it ("Pops up for tie and click event doesn't work,if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        Game.nextTurn();
        expect(tieMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      it ("Not Pops up any message and click event works,if the Game is not won or tied.", function() {
        GameBoard.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        Game.nextTurn();
        expect(winMessage).not.toHaveBeenCalled();
        expect(tieMessage).not.toHaveBeenCalled();
        expect(visualAfterGameOver).not.toHaveBeenCalled();
      });
    });
  });

  describe ("Test visual function", function() {
    var toggleDisplayedButton;
    var restartGame;
    var unbind;
    var click;

    beforeEach (function() {
      toggleDisplayedButton = spyOn(UI, "toggleDisplayedButton");
      restartGame = spyOn(Game, "restartGame");
      unbind = spyOn($.fn, "unbind");
      click = spyOnEvent('tr td', 'click');
    });

    it ("Test call function after game over", function() {
      Game.visualAfterGameOver();
      expect(unbind).toHaveBeenCalled();
      expect(click).not.toHaveBeenTriggered();
      expect(toggleDisplayedButton).toHaveBeenCalled();
      expect(restartGame).toHaveBeenCalled();
    });
  });

  describe ("Return the player", function() {
    var thePlayer;

    it ("Player1 if current player is 'X'", function() {
      Game.currentPlayer = "X"
      thePlayer = Game.winner();
      expect(thePlayer).toBe("Player 1");
    });

    it ("Player1 if current player is 'X'", function() {
      Game.currentPlayer = "O"
      thePlayer = Game.winner();
      expect(thePlayer).toBe("Player 2");
    });
  });

  describe ("Teste choicePlayer function", function() {
    var input;
    var visualAfterChoice;

    beforeEach(function() {
      Game.currentPlayer = "";
      visualAfterChoice = spyOn(Game, "visualAfterChoice");
    })

    it ("If input is null return true", function() {
      var askChoicePlayer = spyOn(UI, "askChoicePlayer").and.returnValue(null);
      input = askChoicePlayer;
      expect(Game.choicePlayer()).toBeTruthy();
    })

    it ("If input is '' return true", function() {
      var askChoicePlayer = spyOn(UI, "askChoicePlayer").and.returnValue("");
      input = askChoicePlayer;
      expect(Game.choicePlayer()).toBeTruthy();
    })

    it ("If input is 'X', will call visualAfterChoice() and will change current player", function() {
      var askChoicePlayer = spyOn(UI, "askChoicePlayer").and.returnValue("X");
      input = askChoicePlayer;
      Game.choicePlayer();
      expect(Game.currentPlayer).toBe("X");
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.choicePlayer()).toBeFalsy();
    })

    it ("If input is 'O', will call visualAfterChoice() and will change current player", function() {
      var askChoicePlayer = spyOn(UI, "askChoicePlayer").and.returnValue("O");
      input = askChoicePlayer;
      Game.choicePlayer();
      expect(Game.currentPlayer).toBe("O");
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.choicePlayer()).toBeFalsy();
    })
  });
});
