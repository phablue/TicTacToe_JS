describe ("Test Computer", function() {
  describe ("Test markChosen Spot", function() {
    beforeEach (function() {
      GameBoard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    });

    it ("Marks a currentPlayer 'X' in the board When chosen spot is 3", function() {
      currentPlayer = "X";
      chosenSpot = 3;
      Computer.markChosenSpot(chosenSpot, currentPlayer);
      expect(GameBoard.spots[chosenSpot-1]).toBe("X");
    });

    it ("Marks a currentPlayer 'O' in the board When chosen spot is 9", function() {
      currentPlayer = "O";
      chosenSpot = 9;
      Computer.markChosenSpot(chosenSpot, currentPlayer);
      expect(GameBoard.spots[chosenSpot-1]).toBe("O");
    });
  });

  describe ("Change a current player", function() {
    it ("To 'O', if a current player is 'X'", function() {
      currentPlayer = "X"
      expect (Computer.changePlayer(currentPlayer)).toBe("O");
    });

    it ("To 'X', if a current player is 'O'", function() {
      currentPlayer = "O";
      expect (Computer.changePlayer(currentPlayer)).toBe("X");
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
    var currentPlayer = "O";

    describe ("Computer chooses easy way for win", function() {
      it ("Choose spot 9 In a row", function() {
        GameBoard.spots = ["X", "X", 3, 4, "X", 6,"O", "O", 9];
        expect(Computer.minimax(currentPlayer)[1]).toBe(9);
      });

      it ("Choose spot 4 In a column", function() {
        GameBoard.spots = ["O", 2, 3, 4, "X", 6, "O", "X", "X"];
        expect(Computer.minimax(currentPlayer)[1]).toBe(4);
      });

      it ("Choose spot 7 In a column", function() {
        GameBoard.spots = ["X", "X", "O", 4, "O", 6, 7, 8, "X"];
        expect(Computer.minimax(currentPlayer)[1]).toBe(7);
      });
    });

    describe ("Computer chooses to block a spot for win", function() {
      it ("Choose spot 8 In a row", function() {
        GameBoard.spots = ["X", "O", 3, "O", 5, 6, "X", 8, "X"];
        expect(Computer.minimax(currentPlayer)[1]).toBe(8);
      });

      it ("Choose spot 4 In a column", function() {
        GameBoard.spots = ["X", "O", 3, 4, 5, 6, "X", 8, 9];
        expect(Computer.minimax(currentPlayer)[1]).toBe(4);
      });

      it ("Choose spot 5 In a column", function() {
        GameBoard.spots = [ "X", "O", "X", "O", 5, 6, "X", 8, 9];
        expect(Computer.minimax(currentPlayer)[1]).toBe(5);
      });
    });
  });

  describe ("Computer choose the best spot", function() {
    var hideComputerMessage;
    var showComputerMessage;
    var currentPlayer = "O";

    beforeEach (function() {
      hideComputerMessage = spyOn(UI, "hideComputerMessage");
      showComputerMessage = spyOn(UI, "showComputerMessage");
      GameBoard.spots = ["X", "O", "X", "O", 5, 6, "X", 8, 9];
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> \
                    <tr> <td id = "0">X</td> <td id = "1">O</td> <td id = "2">X</td> </tr> \
                    <tr> <td id = "3">O</td> <td id = "4"></td> <td id = "5"></td> </tr> \
                    <tr> <td id = "6">X</td> <td id = "7"></td> <td id = "8"></td> </tr> ');
    });

    it ("Call Computer Message function", function() {
      Computer.chooseTheBestSpot(currentPlayer);
      expect(hideComputerMessage).toHaveBeenCalled();
      expect(showComputerMessage).toHaveBeenCalled();
    });

    it ("Marks the best spot", function() {
      expect(GameBoard.spots[4]).toBe(5);
      Computer.chooseTheBestSpot(currentPlayer);
      expect(GameBoard.spots[4]).toBe("O");
    });
  });
});
