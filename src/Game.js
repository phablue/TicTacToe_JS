(function() {
  var input;
  var gameboard = window.GameBoard;
  var ui = window.UI;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    rules: window.GameRules,
    human: window.Human,

    nextTurn: function() {
      if(this.rules.gameWin(this.board)) {
        ui.winMessage(this.winner());
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
      else if(this.rules.gameTie(this.board)) {
        ui.tieMessage();
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
    },

    winner: function() {
      return this.currentPlayer == "X" ? "Player1" : "Player 2";
    },

    goFirst: function() {
      var input = ui.askGoFirst();
      console.log(input);
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
        ui.inputErrorMessage();
        this.goFirst();
      }
      return false;
    },

    startGame: function() {
      var _this = this;
      ui.hideButton(".btn-restart", ".btn-new");
      $(".btn-start").click(function() {
        _this.play();
      });
    },

    newGame: function() {
      var _this = this;
      ui.toggleDisplayedButton(".btn-start", ".btn-new");
      $(".btn-new").click(function() {
        _this.resetGame();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function() {
        ui.toggleDisplayedButton(".btn-restart", ".btn-new");
        _this.resetGame();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      this.board.resetBoard();
      this.play();
    },

    play: function() {
      var _this = this;
      if (_this.goFirst()) {
        return;
      }
      this.newGame();
      this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function() {
        _this.nextTurn();
      });
    }
  };
  window.Game = Game;
})();
