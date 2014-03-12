describe ("Test Computer", function() {
  describe ("Test markChosen Spot", function() {
    beforeEach (function() {
      GameBoard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    });

    it ("Marks a currentPlayer 'X' in the board When chosen spot is 3", function() {
      currentPlayer = "X";
      chosenSpot = 3;
      Computer.markChosenSpot(chosenSpot, currentPlayer);
      expect(GameBoard.spots[chosenSpot]).toBe("X");
    });

    it ("Marks a currentPlayer 'O' in the board When chosen spot is 9", function() {
      currentPlayer = "O";
      chosenSpot = 9;
      Computer.markChosenSpot(chosenSpot, currentPlayer);
      expect(GameBoard.spots[chosenSpot]).toBe("O");
    });
  });

  describe ("Change a current player", function() {
    it ("To 'O', if a current player is 'X'", function() {
      currentPlayer = "X"
      Computer.changePlayer(currentPlayer);
      expect (Computer.currentPlayer).toBe("O");
    });

    it ("To 'X', if a current player is 'O'", function() {
      currentPlayer = "O";
      Computer.changePlayer(currentPlayer);
      expect (Computer.currentPlayer).toBe("X");
    });
  });

  describe ("Test gets point", function() {
    it ("Point < 0 if game win", function() {
      GameBoard.spots = ["X", "O", "X", "X", "O", 6, 7, "O", 9];
      expect(Computer.getPoint(6)).toBeLessThan(0);
    });

    it ("Point == 0 if game is tied", function() {
      GameBoard.spots = ["O", "X", "X", "X", "O", "O", "O", "X", "X"];
      expect(Computer.getPoint(9)).toBe(0);
    });
  });

  describe ("Test minimax", function() {
    describe ("Computer chooses easy way for win", function() {
      it ("In a row", function() {
        GameBoard.spots = ["X", "X", 3, 4, "X", 6,"O", "O", 9];
        expect(Computer.minimax("O")[1]).toBe(9);
      });
    });
  });
});