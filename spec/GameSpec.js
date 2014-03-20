describe ("Test Game", function() {
  describe ("Test winner function", function() {
    describe("when human vs. computer", function() {
      beforeEach(function() {
        UI.gameType = ".player";
      });

      it ("Return Player if current player is 'X'", function() {
        currentPlayer = "X"
        expect(Game.winner(currentPlayer)).toBe("Player");
      });

      it ("Return Computer if current player is 'O'", function() {
        currentPlayer = "O"
        expect(Game.winner(currentPlayer)).toBe("Computer");
      });
    });

    describe("when human vs. human", function() {
      beforeEach(function() {
        UI.gameType = ".players";
      });

      it ("Return Player 'X' if current player is 'X'", function() {
        currentPlayer = "X"
        expect(Game.winner(currentPlayer)).toBe("Player 'X'");
      });

      it ("Return Player 'O' if current player is 'O'", function() {
        currentPlayer = "O"
        expect(Game.winner(currentPlayer)).toBe("Player 'O'");
      });
    });
  });

  describe ("Teste firstMove function", function() {
    var input;
    var toggleDisplayedButton;

    beforeEach(function() {
      Game.currentPlayer = "";
      toggleDisplayedButton = spyOn(UI, "toggleDisplayedButton");
    });

    it ("If input is 'y', will call toggleDisplayedButton() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("y");
      input = askFirstMove;
      Game.firstMove();
      expect(toggleDisplayedButton).toHaveBeenCalled();
      expect(Game.goFirst).toBe("y");
    });

    it ("If input is 'n', will call toggleDisplayedButton() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("n");
      input = askFirstMove;
      Game.firstMove();
      expect(toggleDisplayedButton).toHaveBeenCalled();
      expect(Game.goFirst).toBe("n");
    });
  });

  describe ("Test checkGameOver function", function() {
    var visualWhenGameOver;

    beforeEach (function() {
      visualWhenGameOver = spyOn(UI, "visualWhenGameOver");
    });

    describe ("Call UI message functions", function() {
      it ("call visualWhenGameOver function, if the Game win.", function() {
        GameBoard.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        Game.checkGameOver("X");
        expect(visualWhenGameOver).toHaveBeenCalled();
      });

      it ("call visualWhenGameOver function, if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        Game.checkGameOver("X");
        expect(visualWhenGameOver).toHaveBeenCalled();
      });

      it ("return true, if the Game win.", function() {
        GameBoard.spots = ["X", 2, "X", "O", "O", "O", "X", 8, 9];
        expect(Game.checkGameOver("O")).toBeTruthy();
      });

      it ("return true, if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        expect(Game.checkGameOver("X")).toBeTruthy();
      });

      it ("return false,if the Game is not won or tied.", function() {
        GameBoard.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        expect(Game.checkGameOver("X")).toBeFalsy();
      });
    });
  });

  describe ("Test play function", function() {
    var humanPlay;
    var computerPlay;

    beforeEach(function() {
      humanPlay = spyOn(UI, "humanPlay");
      computerPlay = spyOn(UI, "computerPlay");
    });

    describe("when human vs. computer", function() {
      beforeEach(function() {
        UI.gameType = ".player";
      });

      it ("call humanplay if goFirst is 'y'", function() {
        Game.goFirst = "y";
        Game.playGame();
        expect(humanPlay).toHaveBeenCalled();
      });

      it ("call computerPlay if goFirst is 'n'", function() {
        Game.goFirst = "n";
        Game.playGame();
        expect(computerPlay).toHaveBeenCalled();
      });
    });

    describe("when human vs. human", function() {
      beforeEach(function() {
        UI.gameType = ".players";
      });

      it ("call humanplay", function() {
        Game.playGame();
        expect(humanPlay).toHaveBeenCalled();
      });
    });
  });
});
