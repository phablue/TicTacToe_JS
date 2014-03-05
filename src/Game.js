(function() {
  var Game = {
    currentPlayer: "X",
    board: window.GameBoard,
    rules: window.GameRules,
    human: window.Human(this.board, this.currentPlayer),

    nextTurn: function() {
      if(this.rules.gameWin(this.board)) {
        alert("Congratulations.\nYou win!!");
        $("tr td").off("click", "**");
      }
      else if(this.rules.gameTie(this.board)) {
        alert("Game is tied.\n Game Over.");
        $("tr td").off("click", "**");
      }
    },

    play: function() {
      i = 0;
      while(i < 10) {
        console.log(window.Human);
        this.human.choiceSpot;
        console.log(board.spots);
        this.nextTurn();
        i += 1;
      }
    }
  };
  window.Game = Game;
})();

Game.play();