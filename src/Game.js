(function() {
  var firstPlayer = "X";
  var gameboard = window.GameBoard;
  var Game = {
    currentPlayer: firstPlayer,
    board: gameboard,
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
      var _this = this;
      _this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function() {
        _this.nextTurn();
      });
    }
  };
  window.Game = Game;
})();
