describe ("Test Game", function() {
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
      visualAfterChoice = spyOn(UI, "visualAfterChoice");
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

    it ("call humanplay if goFirst is 'y'", function() {
      Game.goFirst = "y";
      Game.play();
      expect(humanPlay).toHaveBeenCalled();
    });

    it ("call computerPlay if goFirst is 'n'", function() {
      Game.goFirst = "n";
      Game.play();
      expect(computerPlay).toHaveBeenCalled();
    });
  });
});
