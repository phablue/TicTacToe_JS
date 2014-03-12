describe ("Test Computer.js", function() {
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
});