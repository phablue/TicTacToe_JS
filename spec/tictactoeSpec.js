describe ("Change a player to", function() {
  it ("'O', if a current player is 'X'", function() {
    tictactoe.current_player = "X";
    expect (tictactoe.change_player()).toBe("O");
  });
  it ("'X', if a current player is 'O'", function() {
    tictactoe.current_player = "O";
    expect (tictactoe.change_player()).toBe("X");
  });
});


describe ("Get vailable spots from a board", function() {
  it ("vailable spots are [3, 5, 7, 9]", function() {
    tictactoe.board = ["X", "O", 3, "X", 5, "O", 7, "X", 9];
    expect (tictactoe.valid_spots()).toEqual([3, 5, 7, 9]);
  });
  it ("vailable spots are [1, 3, 5, 9]", function() {
    tictactoe.board = [1, "O", 3, "X", 5, "O", "X", "X", 9];
    expect (tictactoe.valid_spots()).toEqual([1, 3, 5, 9]);
  });
});

describe ("Win a Game", function() {
  describe ("If any line of board is 'X,X,X' or 'O,O,O'", function() {
    it ("Win, when 1, 2, 3 spots are 'X'", function() {
      tictactoe.board = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 1, 2, 3 spots are 'X, O, X'", function() {
      tictactoe.board = ["X", "O", "X", 4, 5, 6, 7, 8, 9];
      expect (tictactoe.game_win()).toBe(false);
    });
    it ("Win, when 4, 5, 6 spots are 'O'", function() {
      tictactoe.board = [1, 2, 3, "O", "O", "O", 7, 8, 9];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 4, 5, 6 spots are 'X, X, O'", function() {
      tictactoe.board = [1, 2, 3, "X", "X", "O", 7, 8, 9];
      expect (tictactoe.game_win()).toBe(false);
    });
    it ("Win, when 7, 8, 9 spots are 'O'", function() {
      tictactoe.board = [1, 2, 3, 4, 5, 6, "O", "O", "O"];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 7, 8, 9 spots are 'O, X, O'", function() {
      tictactoe.board = [1, 2, 3, 4, 5, 6, "O", "X", "O"];
      expect (tictactoe.game_win()).toBe(false);
    });
  });
  describe ("If any cloumn of board is 'X,X,X' or 'O,O,O'", function() {
    it ("Win, when 1, 4, 7 spots are 'X'", function() {
      tictactoe.board  = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 1, 4, 7 spots are 'X, O, X'", function() {
      tictactoe.board  = ["X", 2, 3, "O", 5, 6, "X", 8, 9];
      expect (tictactoe.game_win()).toBe(false);
    });
    it ("Win, when 2, 5, 8 spots are 'O'", function() {
      tictactoe.board  = [1, "O", 3, 4, "O", 6, 7, "O", 9];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 2, 5, 8 spots are 'X, X, O'", function() {
      tictactoe.board  = [1, "X", 3, 4, "X", 6, 7, "O", 9];
      expect (tictactoe.game_win()).toBe(false);
    });
    it ("Win, when 3, 6, 9 spots are 'O'", function() {
      tictactoe.board  = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
      expect (tictactoe.game_win()).toBe(true);
    });
    it ("Lose, when 3, 6, 9 spots are 'O, X, O'", function() {
      tictactoe.board  = [1, 2, "O", 4, 5, "X", 7, 8, "O"];
      expect (tictactoe.game_win()).toBe(false);
    });
  });
});

describe ("Game is tied", function() {
  it ("If board doesn't have any number", function() {
    tictactoe.board = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
    expect (tictactoe.game_tie()).toBe(false);
  });
  it ("If board doesn't have any number", function() {
    tictactoe.board = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
    expect (tictactoe.game_tie()).toBe(true);
  });
});

describe ("Game is over", function() {
  it ("If game is tie", function() {
    tictactoe.board = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];
    expect (tictactoe.game_over()).toBe(true);
  });
  it ("If win a game", function() {
    tictactoe.board = [1, 2, "O", 4, 5, "O", 7, 8, "O"];
    expect (tictactoe.game_over()).toBe(true);
  });
});