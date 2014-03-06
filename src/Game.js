(function() {
  var firstPlayer = "X";
  var input;
  var gameboard = window.GameBoard;
  var Game = {
    currentPlayer: firstPlayer,
    board: gameboard,
    rules: window.GameRules,
    human: window.Human,

    nextTurn: function() {
      if(this.rules.gameWin(this.board)) {
        alert("Congratulations.\nYou win!!");
        $("tr td").unbind();
      }
      else if(this.rules.gameTie(this.board)) {
        alert("Game is tied.\nGame Over.");
        $("tr td").unbind();
      }
    },

    goFirst: function() {
      var input = prompt("Do you require the first move? (y/n):");
      if (input === null || input === "") {
        return true;
      }
      else if(input == "y") {
        this.currentPlayer = "X";
      }
      else if(input == "n") {
        this.currentPlayer = "O";
      }
      else {
        alert("You have to choose 'y' or 'n'.");
        this.goFirst();
      }
      return false;
    },

    startGame: function() {
      var _this = this;
      $(".btn-play").click(function() {
        _this.play();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function() {
        $("tr td").empty();
        gameboard.reSet();
      });
    },

    play: function() {
      var _this = this;
      if (_this.goFirst()) {
        return;
      }
      _this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function() {
        _this.nextTurn();
      });
    }
  };
  window.Game = Game;
})();
