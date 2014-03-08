describe ("Test game rules", function() {
  describe ("Check for win", function() {
    describe ("If any row of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 2, 3 spots are 'X'", function() {
        GameBoard.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 1, 2, 3 spots are 'X, O, X'", function() {
        GameBoard.spots = ["X", "O", "X", 4, 5, 6, 7, 8, 9];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });

      it ("Win, when 4, 5, 6 spots are 'O'", function() {
        GameBoard.spots = [1, 2, 3, "O", "O", "O", 7, 8, 9];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 4, 5, 6 spots are 'X, X, O'", function() {
        GameBoard.spots = [1, 2, 3, "X", "X", "O", 7, 8, 9];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });

      it ("Win, when 7, 8, 9 spots are 'O'", function() {
        GameBoard.spots = [1, 2, 3, 4, 5, 6, "O", "O", "O"];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 7, 8, 9 spots are 'O, X, O'", function() {
        GameBoard.spots = [1, 2, 3, 4, 5, 6, "O", "X", "O"];
        expect (GameRules.winRequirementForRow(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });
    });

    describe ("If any column of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 4, 7 spots are 'X'", function() {
        GameBoard.spots = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 1, 4, 7 spots are 'X, O, X'", function() {
        GameBoard.spots = ["X", 2, 3, "O", 5, 6, "X", 8, 9];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });

      it ("Win, when 2, 5, 8 spots are 'O'", function() {
        GameBoard.spots = [1, "O", 3, 4, "O", 6, 7, "O", 9];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 2, 5, 8 spots are 'X, X, O'", function() {
        GameBoard.spots = [1, "X", 3, 4, "X", 6, 7, "O", 9];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });

      it ("Win, when 3, 6, 9 spots are 'O'", function() {
        GameBoard.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 3, 6, 9 spots are 'O, X, O'", function() {
        GameBoard.spots = [1, 2, "O", 4, 5, "X", 7, 8, "O"];
        expect (GameRules.winRequirementForColumn(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });
    });

    describe ("If any diagonal of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 5, 9 spots are 'X'", function() {
        GameBoard.spots = ["X", 2, 3, 4, "X", 6, 7, 8, "X"];
        expect (GameRules.winRequirementForDiagonal(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 1, 5, 9 spots are 'X, O, X'", function() {
        GameBoard.spots = ["X", 2, 3, 4, "O", 6, 7, 8, "X"];
        expect (GameRules.winRequirementForDiagonal(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });

      it ("Win, when 3, 5, 7 spots are 'O'", function() {
        GameBoard.spots = [1, 2, "O", 4, "O", 6, "O", 8, 9];
        expect (GameRules.winRequirementForDiagonal(GameBoard)).toBe(true);
        expect (GameRules.gameWin(GameBoard)).toBe(true);
      });

      it ("Lose, when 3, 5, 7 spots are 'X, X, O'", function() {
        GameBoard.spots = [1, 2, "X", 4, "X", 6, "O", 8, 9];
        expect (GameRules.winRequirementForDiagonal(GameBoard)).toBe(false);
        expect (GameRules.gameWin(GameBoard)).toBe(false);
      });
    });
  });

  describe ("Game is tied", function() {
    it ("If board doesn't have any number", function() {
      GameBoard.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
      expect (GameRules.gameTie(GameBoard)).toBe(false);
    });

    it ("If board doesn't have any number", function() {
      GameBoard.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (GameRules.gameTie(GameBoard)).toBe(true);
    });
  });

  describe ("Game is over", function() {
    it ("If game is tie", function() {
      GameBoard.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (GameRules.gameOver(GameBoard)).toBe(true);
    });

    it ("If win a game", function() {
      GameBoard.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
      expect (GameRules.gameOver(GameBoard)).toBe(true);
    });
  });
});