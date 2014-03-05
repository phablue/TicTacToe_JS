(function() {
  var Game = {
    currentPlayer: "X",
    board: window.GameBoard,
    rules: window.GameRules,
    human: window.Human,

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
      console.log(this.board);
      i = 0;
      while(i < 10) {
        this.human.choiceSpot;
        this.nextTurn();
        i += 1;
      }
    }
  };
  window.Game = Game;
})();

Game.play();