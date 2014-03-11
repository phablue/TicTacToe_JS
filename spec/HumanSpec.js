describe ("Test Human", function() {
  var currentPlayer;

  beforeEach(function () {
    GameBoard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  describe ("Change a current player", function() {
    it ("To 'O', if a current player is 'X'", function() {
      currentPlayer = "X"
      Human.changePlayer(currentPlayer);
      expect (Human.currentPlayer).toBe("O");
    });

    it ("To 'X', if a current player is 'O'", function() {
      currentPlayer = "O";
      Human.changePlayer(currentPlayer);
      expect (Human.currentPlayer).toBe("X");
    });
  });

  describe("Sets value of selected elements", function() {
    it ("td #0 and board[0] value changes to 'X' and current player changes to 'O'", function() {
      currentPlayer = "X";
      setFixtures("<tr> <td id = '0'></td></tr>");
      expect ($("tr td")).toBeEmpty();
      Human.choiceSpot(GameBoard, currentPlayer);
      $("tr td").click();
      expect ($("#0")).toHaveText("X");
      expect (GameBoard.spots[0]).toBe("X");
      expect (Human.currentPlayer).toBe("O");
    });

    it ("td #3 and board[3] value changes to 'O' and current player changes to 'X'", function() {
      currentPlayer = "O";
      setFixtures("<tr> <td id = '3'></td></tr>");
      expect ($("tr td")).toBeEmpty();
      Human.choiceSpot(GameBoard, currentPlayer);
      $("tr td").click();
      expect ($("#3")).toHaveText("O");
      expect (GameBoard.spots[3]).toBe("O");
      expect (Human.currentPlayer).toBe("X");
    });

    it ("Can't set of a choosen spot", function() {
      var errorMessage = spyOn(UI, "spotErrorMessage");
      currentPlayer = "O";
      setFixtures("<tr> <td id = '0'>X</td><td id = '3'></td></tr>");
      Human.choiceSpot(GameBoard, currentPlayer);
      $("#0").click();
      expect (errorMessage).toHaveBeenCalled();
    });
  });
});