describe ("Test Human", function() {
  var gameboard;
  var human;
  var currentPlayer;

  beforeEach(function () {
    gameboard = window.GameBoard;
    human = window.Human;
    gameboard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  describe ("Change a current player", function() {
    it ("To 'O', if a current player is 'X'", function() {
      currentPlayer = "X"
      human.changePlayer(currentPlayer);
      expect (human.currentPlayer).toBe("O");
    });

    it ("To 'X', if a current player is 'O'", function() {
      currentPlayer = "O";
      human.changePlayer(currentPlayer);
      expect (human.currentPlayer).toBe("X");
    });
  });

  describe("Sets value of selected elements", function() {
    it ("td #0 and board[0] value changes to 'X' and current player changes to 'O'", function() {
      currentPlayer = "X";
      setFixtures("<tr> <td id = '0'></td></tr>");
      human = window.Human;
      expect ($("tr td")).toBeEmpty();
      human.choiceSpot(gameboard, currentPlayer);
      $("tr td").click();
      expect ($("#0")).toHaveText("X");
      expect (gameboard.spots[0]).toBe("X");
      expect (human.currentPlayer).toBe("O");
    });

    it ("td #3 and board[3] value changes to 'O' and current player changes to 'X'", function() {
      currentPlayer = "O";
      setFixtures("<tr> <td id = '3'></td></tr>");
      human = window.Human;
      expect ($("tr td")).toBeEmpty();
      human.choiceSpot(gameboard, currentPlayer);
      $("tr td").click();
      expect ($("#3")).toHaveText("O");
      expect (gameboard.spots[3]).toBe("O");
      expect (human.currentPlayer).toBe("X");
    });
  });
});