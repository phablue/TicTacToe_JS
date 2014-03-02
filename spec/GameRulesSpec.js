describe ("Test game rules", function() {
  var game_rules;
  var game_board;

  beforeEach (function() {
    game_board = new GameBoard();
    game_rules = new GameRules();
  });

  describe ("Win a Game", function() {
    describe ("If any row of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 2, 3 spots are 'X'", function() {
        game_board.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 1, 2, 3 spots are 'X, O, X'", function() {
        game_board.spots = ["X", "O", "X", 4, 5, 6, 7, 8, 9];
        expect (game_rules.game_win(game_board)).toBe(false);
      });

      it ("Win, when 4, 5, 6 spots are 'O'", function() {
        game_board.spots = [1, 2, 3, "O", "O", "O", 7, 8, 9];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 4, 5, 6 spots are 'X, X, O'", function() {
        game_board.spots = [1, 2, 3, "X", "X", "O", 7, 8, 9];
        expect (game_rules.game_win(game_board)).toBe(false);
      });

      it ("Win, when 7, 8, 9 spots are 'O'", function() {
        game_board.spots = [1, 2, 3, 4, 5, 6, "O", "O", "O"];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 7, 8, 9 spots are 'O, X, O'", function() {
        game_board.spots = [1, 2, 3, 4, 5, 6, "O", "X", "O"];
        expect (game_rules.game_win(game_board)).toBe(false);
      });
    });

    describe ("If any column of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 4, 7 spots are 'X'", function() {
        game_board.spots = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 1, 4, 7 spots are 'X, O, X'", function() {
        game_board.spots = ["X", 2, 3, "O", 5, 6, "X", 8, 9];
        expect (game_rules.game_win(game_board)).toBe(false);
      });

      it ("Win, when 2, 5, 8 spots are 'O'", function() {
        game_board.spots = [1, "O", 3, 4, "O", 6, 7, "O", 9];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 2, 5, 8 spots are 'X, X, O'", function() {
        game_board.spots = [1, "X", 3, 4, "X", 6, 7, "O", 9];
        expect (game_rules.game_win(game_board)).toBe(false);
      });

      it ("Win, when 3, 6, 9 spots are 'O'", function() {
        game_board.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 3, 6, 9 spots are 'O, X, O'", function() {
        game_board.spots = [1, 2, "O", 4, 5, "X", 7, 8, "O"];
        expect (game_rules.game_win(game_board)).toBe(false);
      });
    });

    describe ("If any diagonal of board is 'X,X,X' or 'O,O,O'", function() {
      it ("Win, when 1, 5, 9 spots are 'X'", function() {
        game_board.spots = ["X", 2, 3, 4, "X", 6, 7, 8, "X"];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 1, 5, 9 spots are 'X, O, X'", function() {
        game_board.spots = ["X", 2, 3, 4, "O", 6, 7, 8, "X"];
        expect (game_rules.game_win(game_board)).toBe(false);
      });

      it ("Win, when 3, 5, 7 spots are 'O'", function() {
        game_board.spots = [1, 2, "O", 4, "O", 6, "O", 8, 9];
        expect (game_rules.game_win(game_board)).toBe(true);
      });

      it ("Lose, when 3, 5, 7 spots are 'X, X, O'", function() {
        game_board.spots = [1, 2, "X", 4, "X", 6, "O", 8, 9];
        expect (game_rules.game_win(game_board)).toBe(false);
      });
    });
  });

  describe ("Game is tied", function() {
    it ("If board doesn't have any number", function() {
      game_board.spots = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
      expect (game_rules.game_tie(game_board)).toBe(false);
    });

    it ("If board doesn't have any number", function() {
      game_board.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (game_rules.game_tie(game_board)).toBe(true);
    });
  });

  describe ("Game is over", function() {
    it ("If game is tie", function() {
      game_board.spots = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
      expect (game_rules.game_over(game_board)).toBe(true);
    });

    it ("If win a game", function() {
      game_board.spots = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
      expect (game_rules.game_over(game_board)).toBe(true);
    });
  });
});