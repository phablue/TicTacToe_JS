describe ("Test Game", function() {
  describe ("Test visualAfterGameOver function", function() {
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

  describe ("Test winner function", function() {
    var thePlayer;

    it ("Player1 if current player is 'X'", function() {
      currentPlayer = "X"
      thePlayer = Game.winner(currentPlayer);
      expect(thePlayer).toBe("Player");
    });

    it ("Player1 if current player is 'X'", function() {
      currentPlayer = "O"
      thePlayer = Game.winner(currentPlayer);
      expect(thePlayer).toBe("Computer");
    });
  });

  describe ("Teste firstMove function", function() {
    var input;
    var visualAfterChoice;

    beforeEach(function() {
      Game.currentPlayer = "";
      visualAfterChoice = spyOn(Game, "visualAfterChoice");
    })

    it ("If input is null return true", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue(null);
      input = askFirstMove;
      expect(Game.firstMove()).toBeTruthy();
    })

    it ("If input is '' return true", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("");
      input = askFirstMove;
      expect(Game.firstMove()).toBeTruthy();
    })

    it ("If input is 'y', will call visualAfterChoice() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("y");
      input = askFirstMove;
      Game.firstMove();
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.goFirst).toBe("y");
    })

    it ("If input is 'n', will call visualAfterChoice() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("n");
      input = askFirstMove;
      Game.firstMove();
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.goFirst).toBe("n");
    })
  });

  describe ("Test nextTurn function", function() {
    var winMessage;
    var tieMessage;
    var visualAfterGameOver;

    beforeEach (function() {
      winMessage = spyOn(UI, "winMessage");
      tieMessage = spyOn(UI, "tieMessage");
      visualAfterGameOver = spyOn(Game, "visualAfterGameOver");
    });

    describe ("Message pops up when GameOver", function() {
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

  describe ("Test humanPlay function", function() {
    var showHumanMessage;
    var hideHumanMessage;
    var click;

    beforeEach(function() {
      GameBoard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      showHumanMessage = spyOn(UI, "showHumanMessage");
      hideHumanMessage = spyOn(UI, "hideHumanMessage");
      click = spyOnEvent('tr td', 'click');
      setFixtures(' <h1 id = "Human">Click a spot you want.</h1> \
                    <button type="button" class = "btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> \
                    <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr> ');
    });

    it ("Shows message for human player after humanPlay running", function() {
      Game.humanPlay(Game.computerPlay);
      expect(showHumanMessage).toHaveBeenCalled();
      expect($("#jasmine-fixtures #Human")).toBeVisible();
    });

    it ("After human choice a spot cant click", function() {
      Game.humanPlay(Game.computerPlay);
      $("#jasmine-fixtures #0").click();
      expect(click).not.toHaveBeenTriggered()
    })
  })
});
























