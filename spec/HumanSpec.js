describe ("Test Human", function() {
  var currentPlayer;
  var e;

  describe("Sets value of selected elements", function() {
    beforeEach(function() {
      GameBoard.spots = [1, "X", 3];
      setFixtures(' <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr> </table>');
    });

    it ("td #0 and board[0] value changes to 'X' and current player changes to 'O'", function() {
      currentPlayer = "X";
      expect ($("tr td")).toBeEmpty();
      e = $("#0").click();
      Human.choiceSpot(e, GameBoard, _this.currentPlayer);
      expect ($("#0")).toHaveText("X");
      expect (GameBoard.spots[0]).toBe("X");
    });

    it ("td #2 and board[2] value changes to 'O' and current player changes to 'X'", function() {
      currentPlayer = "O";
      expect ($("#2")).toBeEmpty();
      e = $('#2').trigger("click");
      Human.choiceSpot(e, GameBoard, _this.currentPlayer);
      expect ($("#2")).toHaveText("O");
      expect (GameBoard.spots[2]).toBe("O");
    });

    it ("Can't set of a choosen spot", function() {
      var errorMessage = spyOn(UI, "spotErrorMessage");
      currentPlayer = "O";
      e = $('#1').trigger("click");
      Human.choiceSpot(e, GameBoard, _this.currentPlayer);
      expect (errorMessage).toHaveBeenCalled();
    });
  });
});
