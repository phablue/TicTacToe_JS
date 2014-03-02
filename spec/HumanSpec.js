describe ("Test Human", function() {
  var game_board;
  var human;

  beforeEach(function () {
    game_board = new GameBoard();
    human = new Human();
    game_board.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  describe("Sets value of selected elements", function() {
    it ("td #0 and board[0] is 'X' after setting", function() {
      var current_player = "X";
      setFixtures("<tr> <td id = '0'></td></tr>");
      human = new Human(game_board, current_player);
      expect ($("tr td")).toBeEmpty();
      $("tr td").click();
      human.choice_spot;
      expect ($("#0")).toHaveText("X");
      expect (game_board.spots[0]).toBe("X");
    });

    it ("td #0 and board[0] is 'O' after setting", function() {
      var current_player = "O";
      setFixtures("<tr> <td id = '3'></td></tr>");
      human = new Human(game_board, current_player);
      expect ($("tr td")).toBeEmpty();
      $("tr td").click();
      human.choice_spot;
      expect ($("#3")).toHaveText("O");
      expect (game_board.spots[3]).toBe("O");
    });
  });
});