describe ("Test game rules", function() {
  var gamerules;
  var gameboard;

  beforeEach (function() {
    gameboard = window.GameBoard;
    gamerules = window.GameRules;
  });

  describe ("Check for win", function() {
    describe ("If any row of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 2, 3 spots are 'X'", function() {
        gameboard.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 1, 2, 3 spots are 'X, O, X'", function() {
        gameboard.spots = ["X", "O", "X", 4, 5, 6, 7, 8, 9];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });

      it ("Win, when 4, 5, 6 spots are 'O'", function() {
        gameboard.spots = [1, 2, 3, "O", "O", "O", 7, 8, 9];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 4, 5, 6 spots are 'X, X, O'", function() {
        gameboard.spots = [1, 2, 3, "X", "X", "O", 7, 8, 9];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });

      it ("Win, when 7, 8, 9 spots are 'O'", function() {
        gameboard.spots = [1, 2, 3, 4, 5, 6, "O", "O", "O"];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 7, 8, 9 spots are 'O, X, O'", function() {
        gameboard.spots = [1, 2, 3, 4, 5, 6, "O", "X", "O"];
        expect (gamerules.winRequirementForRow(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });
    });

    describe ("If any column of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 4, 7 spots are 'X'", function() {
        gameboard.spots = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 1, 4, 7 spots are 'X, O, X'", function() {
        gameboard.spots = ["X", 2, 3, "O", 5, 6, "X", 8, 9];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });

      it ("Win, when 2, 5, 8 spots are 'O'", function() {
        gameboard.spots = [1, "O", 3, 4, "O", 6, 7, "O", 9];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 2, 5, 8 spots are 'X, X, O'", function() {
        gameboard.spots = [1, "X", 3, 4, "X", 6, 7, "O", 9];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });

      it ("Win, when 3, 6, 9 spots are 'O'", function() {
        gameboard.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 3, 6, 9 spots are 'O, X, O'", function() {
        gameboard.spots = [1, 2, "O", 4, 5, "X", 7, 8, "O"];
        expect (gamerules.winRequirementForColumn(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });
    });

    describe ("If any diagonal of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 5, 9 spots are 'X'", function() {
        gameboard.spots = ["X", 2, 3, 4, "X", 6, 7, 8, "X"];
        expect (gamerules.winRequirementForDiagonal(gameboard)).toBe(true);
        expect (gamerules.gameWin(gameboard)).toBe(true);
      });

      it ("Lose, when 1, 5, 9 spots are 'X, O, X'", function() {
        gameboard.spots = ["X", 2, 3, 4, "O", 6, 7, 8, "X"];
        expect (gamerules.winRequirementForDiagonal(gameboard)).toBe(false);
        expect (gamerules.gameWin(gameboard)).toBe(false);
      });

      it ("Win, when 3, 5, 7 spots are 'O'", function() {
        gameboard.spots = [1, 2, "O", 4, "O", 6, "O", 8, 9];
        expect (gamerules.winRequirementForDiagonal(gameboard)).toBe(true);
      });

      it ("Lose, when 3, 5, 7 spots are 'X, X, O'", function() {
        gameboard.spots = [1, 2, "X", 4, "X", 6, "O", 8, 9];
        expect (gamerules.winRequirementForDiagonal(gameboard)).toBe(false);
      });
    });
  });

  describe ("Game is tied", function() {
    it ("If board doesn't have any number", function() {
      gameboard.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
      expect (gamerules.gameTie(gameboard)).toBe(false);
    });

    it ("If board doesn't have any number", function() {
      gameboard.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (gamerules.gameTie(gameboard)).toBe(true);
    });
  });

  describe ("Game is over", function() {
    it ("If game is tie", function() {
      gameboard.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (gamerules.gameOver(gameboard)).toBe(true);
    });

    it ("If win a game", function() {
      gameboard.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
      expect (gamerules.gameOver(gameboard)).toBe(true);
    });
  });
});